<script setup>
import { onMounted, ref, onUnmounted, defineEmits } from 'vue'
import MainMenu from './MainMenu.vue'
import { useRouter } from 'vue-router'

const props = defineProps({
    menus: Array,
});

const toggledId = ref(false);
const currentTarget = ref(null);
const slider = ref(null);
const hoverSlider = ref(null);
const emit = defineEmits(["setCurrentMenu"]);

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
const windowResized = () => moveSlider(slider, currentTarget.value);
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
</script>

<template>
  <nav class="bg-gray-800 w-auto relative z-0 flex flex-row flex-wrap">
      <MainMenu v-for="(menu, index) in menus" :key="menu.id" :toggled="toggled(menu.id)" :menu="menu" 
                class="main-menu-size relative z-30"
                @mouseenter="(event) => onMouseEnter(event, index)" @mouseleave="onMouseLeave" 
                @mousedown="onMouseDown(index)" @mouseup="onMouseUp(index)" @click="onClick($event, index)"/>
      <div ref="slider" class="main-menu-size rounded-xl bg-yellow-500 transition-all ease-out duration-300 absolute z-20" style="left: 0px; top: 0px"></div>
      <div ref="hoverSlider" class="main-menu-size rounded-xl bg-yellow-500 transition-all ease-out duration-300 absolute z-10 opacity-0" style="left: 0px; top: 0px"></div>
  </nav>
</template>

<style scoped>
.main-menu-size {
    @apply w-24 h-24 m-3;
}
</style>