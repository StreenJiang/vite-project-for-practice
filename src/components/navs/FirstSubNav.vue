<script setup>
import { onMounted, ref, onUnmounted, nextTick } from 'vue'
import SubMenu from './SubMenu.vue'
import { useRouter } from 'vue-router'
import { debounce } from 'lodash'; // Add this import at the top of your file

const props = defineProps({
    menus: Array,
});

const toggledId = ref(false);
const currentTarget = ref(null);
const slider = ref(null);
const hoverSlider = ref(null);
const subMenuRefs = ref([]);
const navRef = ref(null);
const resizeObserver = ref(null);

onMounted(() => {
    let curr = props.menus[0];

    curr.toggled = true;
    toggledId.value = curr.id;
    useRouter().replace(curr.routeTo);

    nextTick(() => {
        setupResizeObserver();
    });

    window.addEventListener('resize', windowResized);  
});
onUnmounted(() => {  
    window.removeEventListener('resize', windowResized);
    if (resizeObserver.value) {
        resizeObserver.value.disconnect();
    }
});  

// ==================================================================================
// Events
function liClick(event, index) {
    currentTarget.value = event.currentTarget;
    const clickingOne = props.menus[index];
    const curr = props.menus.find(menu => menu.toggled);
    if (curr.id != clickingOne.id) {
        // Reset previous menu
        curr.toggled = false;
        // Toggle new menu
        clickingOne.toggled = true;

        // Hide hover slider and move toggle slider to current
        hideHoverSlider();
        moveSlider(slider, currentTarget.value);

        // Cached id of current toggled menu, this can trigger menu component to change color
        toggledId.value = clickingOne.id;
    }
}
function onMouseEnter(event, index) {
    if (!props.menus[index].toggled) {
        removeActive();
        moveSlider(hoverSlider, event.currentTarget);
        showHoverSlider();
    }
}
const onMouseLeave = () => hideHoverSlider();
const onMouseDown = (index) => {
    if (!props.menus[index].toggled) {
        addActive();
    }
};
const onMouseUp = (index) => {
    if (!props.menus[index].toggled) {
        removeActive();
    }
};
const windowResized = () => {
    moveSlider(slider, currentTarget.value);
    updateNavWidth();
};

// ==================================================================================

// ==================================================================================
// Reuseable methods
function moveSlider(_slider, target) {
    if (target != null) {
        _slider.value.style.marginLeft = `0px`;
        _slider.value.style.marginTop = `0px`;
        _slider.value.style.transform = `translate(${target.offsetLeft}px, ${target.offsetTop}px)`;
    }
}
function showHoverSlider() {
    hoverSlider.value.classList.remove("opacity-0");
    hoverSlider.value.classList.add("opacity-25");
}
function hideHoverSlider() {
    hoverSlider.value.classList.remove("opacity-25");
    hoverSlider.value.classList.remove("opacity-50");
    hoverSlider.value.classList.add("opacity-0");
}
const addActive = () => {
    hoverSlider.value.classList.remove("opacity-25");
    hoverSlider.value.classList.add("opacity-50");
};
const removeActive = () => {
    hoverSlider.value.classList.remove("opacity-50");
    hoverSlider.value.classList.add("opacity-25");
};
const toggled = (menuId) => toggledId.value === menuId;
// ==================================================================================
function setupResizeObserver() {
    resizeObserver.value = new ResizeObserver((entries) => {
        // Use requestAnimationFrame to limit the frequency of updates
        requestAnimationFrame(() => {
            updateNavWidth();
        });
    });

    // Observe each SubMenu component
    subMenuRefs.value.forEach(el => {
        resizeObserver.value.observe(el.$el);
    });

    // Also observe the nav element itself
    resizeObserver.value.observe(navRef.value);
}

const debouncedUpdateNavWidth = debounce(() => {
    if (subMenuRefs.value.length > 0) {
        const maxWidth = Math.max(...subMenuRefs.value.map(el => el.$el.scrollWidth));
        
        const totalWidth = maxWidth + 24; // 24px for margins
        navRef.value.style.width = `${totalWidth}px`;
        slider.value.style.width = `${totalWidth - 24}px`; // Subtract margins
        hoverSlider.value.style.width = `${totalWidth - 24}px`; // Subtract margins
        
        // Set min-width for sub-menus to prevent text overflow
        subMenuRefs.value.forEach(el => {
            el.$el.style.minWidth = `${totalWidth - 24}px`; // Subtract margins
        });
    }
}, 200);

function updateNavWidth() {
    debouncedUpdateNavWidth();
}
</script>

<template>
  <nav ref="navRef" class="border-gray-500 border-r bg-gray-700 h-full relative z-0 flex flex-col">
      <SubMenu v-for="(menu, index) in menus" 
               :key="menu.id" 
               :toggled="toggled(menu.id)" 
               :menu="menu" 
               class="sub-menu-size relative z-30"
               @mouseenter="onMouseEnter($event, index)" 
               @mouseleave="onMouseLeave" 
               @mousedown="onMouseDown(index)" 
               @mouseup="onMouseUp(index)" 
               @click="liClick($event, index)"
               ref="subMenuRefs"/>
      <div ref="slider" class="sub-menu-size rounded-xl bg-gray-400 transition-all ease-out duration-300 absolute z-20"></div>
      <div ref="hoverSlider" class="sub-menu-size rounded-xl bg-gray-400 transition-all ease-out duration-300 absolute z-10 opacity-0"></div>
  </nav>
</template>

<style scoped>
.sub-menu-size {
    @apply w-min sxga:min-w-48 sxga:h-12 sxga:m-3 sm:min-w-40 sm:h-10 sm:m-2;
}
</style>