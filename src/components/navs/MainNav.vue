<script setup>
import { onMounted, ref, onUnmounted, defineEmits, computed, nextTick } from 'vue'
import MainMenu from './MainMenu.vue'
import { useRouter } from 'vue-router'
import { Teleport } from 'vue'

const props = defineProps({
    menus: Array,
});

const toggledId = ref(false);
const currentTarget = ref(null);
const slider = ref(null);
const hoverSlider = ref(null);
const emit = defineEmits(["setCurrentMenu"]);
const isIconMode = ref(false);
const isTransitioning = ref(false);
const hoveredMenu = ref(null);
const mousePosition = ref({ x: 0, y: 0 });
const showTooltip = ref(false);

const menuClass = computed(() => isIconMode.value ? 'main-menu-size-icon-mode' : 'main-menu-size');

// Remove this line as we no longer need different sizes
// const switchButtonClass = computed(() => isIconMode.value ? 'w-6 h-6' : 'w-8 h-8');

// Update this computed property for new icons
const switchIcon = computed(() => isIconMode.value 
    ? 'M4 6h4v4H4V6zm0 8h4v4H4v-4zm8-8h8v4h-8V6zm0 8h8v4h-8v-4z'  // Icon mode (switch to full mode)
    : 'M4 6h16v4H4V6zm0 8h16v4H4v-4z'  // Full mode (switch to icon mode)
);

// Add this computed property for dynamic icon
// const switchIcon = computed(() => isIconMode.value 
//     ? 'M12 19l9 2-9-18-9 18 9-2zm0 0v-8' 
//     : 'M12 5l9 2-9-18-9 18 9-2zm0 0v8'
// );

function toggleIconMode() {
    isTransitioning.value = true;
    
    // Fade out
    setTimeout(() => {
        isIconMode.value = !isIconMode.value;
        
        // Wait for the fade-out transition to complete
        setTimeout(() => {
            // Recalculate positions
            moveSlider(slider, currentTarget.value);
            moveSlider(hoverSlider, currentTarget.value);
            
            // Fade in
            nextTick(() => {
                isTransitioning.value = false;
            });
        }, 300); // Changed back to 300ms
    }, 200);
}

// Modify windowResized function
const windowResized = () => {
    moveSlider(slider, currentTarget.value);
    moveSlider(hoverSlider, currentTarget.value);
};

onMounted(() => {
    let curr = props.menus[0];

    curr.toggled = true;
    toggledId.value = curr.id;
    useRouter().replace(curr.routeTo);
    emit("setCurrentMenu", curr);

    window.addEventListener('resize', windowResized);  
});
onUnmounted(() => {  
    window.removeEventListener('resize', windowResized);  
});  

// ==================================================================================
// Events
function onClick(event, index) {
    currentTarget.value = event.currentTarget;
    // Set current menu into parent
    emit("setCurrentMenu", props.menus[index]);

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
    hoveredMenu.value = props.menus[index];
    updateMousePosition(event);
    showTooltip.value = true;
}
function onMouseMove(event) {
    updateMousePosition(event);
}
function updateMousePosition(event) {
    mousePosition.value = {
        x: event.clientX,
        y: event.clientY
    };
}
const onMouseLeave = () => {
    hideHoverSlider();
    showTooltip.value = false;
    setTimeout(() => {
        if (!showTooltip.value) {
            hoveredMenu.value = null;
        }
    }, 300); // Match this with the transition duration
};
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
// ==================================================================================

// ==================================================================================
// Reuseable methods
function moveSlider(_slider, target) {
    if (target != null) {
        const style = window.getComputedStyle(_slider.value);
        _slider.value.style.left = `${target.offsetLeft - parseInt(style.marginLeft, 10)}px`;
        _slider.value.style.top = `${target.offsetTop - parseInt(style.marginTop, 10)}px`;
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

// Update this computed property for even less spaced text
const spacedMenuName = computed(() => {
    return hoveredMenu.value ? hoveredMenu.value.name.split('').join('\u200A') : '';
});
</script>

<template>
  <nav class="bg-gray-800 w-auto relative z-0 flex flex-row flex-wrap">
      <MainMenu v-for="(menu, index) in menus" :key="menu.id" 
                :toggled="toggled(menu.id)" 
                :menu="menu" 
                :isIconMode="isIconMode"
                :class="[menuClass, 'relative z-30 transition-all duration-300', { 'opacity-0': isTransitioning }]"
                @mouseenter="(event) => onMouseEnter(event, index)" 
                @mouseleave="onMouseLeave" 
                @mousemove="onMouseMove"
                @mousedown="onMouseDown(index)" 
                @mouseup="onMouseUp(index)" 
                @click="onClick($event, index)"/>
      
      <!-- Move the tooltip outside of the nav component using Teleport -->
      <Teleport to="body">
        <Transition name="fade">
          <div v-if="hoveredMenu && isIconMode && showTooltip" 
               class="fixed z-[9999] bg-gray-700 text-white px-2 py-1 rounded-md text-sm whitespace-nowrap pointer-events-none shadow-lg tracking-normal"
               :style="{ left: `${mousePosition.x + 10}px`, top: `${mousePosition.y + 10}px` }">
            {{ spacedMenuName }}
          </div>
        </Transition>
      </Teleport>
      
      <div ref="slider" :class="[menuClass, 'rounded-xl bg-yellow-500 transition-all ease-out duration-300 absolute z-20', { 'opacity-0': isTransitioning }]" style="left: 0px; top: 0px"></div>
      <div ref="hoverSlider" :class="[menuClass, 'rounded-xl bg-yellow-500 transition-all ease-out duration-300 absolute z-10 opacity-0', { 'opacity-0': isTransitioning }]" style="left: 0px; top: 0px"></div>
      <button @click="toggleIconMode" 
              class="w-8 h-8 absolute bottom-3 right-3 text-yellow-500 rounded-xl hover:bg-gray-700 focus:outline-none transition-all duration-300 ease-in-out flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-[21.6px] h-[21.6px] transition-all duration-300" viewBox="0 0 24 24" fill="currentColor">
              <path :d="switchIcon" />
          </svg>
      </button>
  </nav>
</template>

<style scoped>
.main-menu-size {
    @apply w-24 h-24 m-3;
}

.main-menu-size-icon-mode {
    @apply w-12 h-12 m-2;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, visibility 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  visibility: hidden;
}

/* Remove this as it's no longer needed */
/* :root {
  --tooltip-z-index: 9999;
} */
</style>