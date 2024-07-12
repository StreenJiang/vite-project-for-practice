<script setup>
import { onMounted, ref, onUnmounted } from 'vue'
import SubMenu from './SubMenu.vue'

const props = defineProps({
    menus: Array,
});

const toggledId = ref(false);
const currentTarget = ref(null);
const slider = ref(null);
const hoverSlider = ref(null);

onMounted(() => {
    props.menus[0].toggled = true;
    toggledId.value = props.menus[0].id;

    window.addEventListener('resize', windowResized);  
});
onUnmounted(() => {  
  window.removeEventListener('resize', windowResized);  
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
function liMouseEnter(event, index) {
    if (!props.menus[index].toggled) {
        removeActive();
        moveSlider(hoverSlider, event.currentTarget);
        showHoverSlider();
    }
}
const liMouseLeave = () => hideHoverSlider();
const liMouseDown = (index) => {
    if (!props.menus[index].toggled) {
        addActive();
    }
};
const liMouseUp = (index) => {
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
  <nav class="border-gray-800 bg-gray-700 w-min h-full relative z-0 flex flex-col">
      <SubMenu v-for="(menu, index) in menus" :key="menu.id" :toggled="toggled(menu.id)" :menu="menu" 
                class="sub-menu-size relative z-30"
                @mouseenter="liMouseEnter($event, index)" @mouseleave="liMouseLeave" 
                @mousedown="liMouseDown(index)" @mouseup="liMouseUp(index)" @click="liClick($event, index)"/>
      <div ref="slider" class="sub-menu-size rounded-xl bg-cyan-500 transition-all ease-out duration-300 absolute z-20" style="left: 0px; top: 0px"></div>
      <div ref="hoverSlider" class="sub-menu-size rounded-xl bg-cyan-500 transition-all ease-out duration-300 absolute z-10 opacity-0" style="left: 0px; top: 0px"></div>
  </nav>
</template>

<style scoped>
.sub-menu-size {
    @apply min-w-52 w-min h-12 m-3;
}
</style>