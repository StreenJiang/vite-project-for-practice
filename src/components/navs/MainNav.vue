<script setup>
import { onMounted, ref, onUnmounted, computed, nextTick, watch } from 'vue'
import MainMenu from './MainMenu.vue'
import { useRouter } from 'vue-router'
import Tooltip from '../reusables/Tooltip.vue'
import { useDebounce } from '@vueuse/core'
import Avatar from 'primevue/avatar';
import OverlayBadge from 'primevue/overlaybadge';
import 'primeicons/primeicons.css'


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
const tooltipTimer = ref(null);

const menuClass = computed(() => isIconMode.value ? 'main-menu-size-icon-mode' : 'main-menu-size');

// Update this computed property for new icons
const switchIcon = computed(() => isIconMode.value
    ? 'M4 6h4v4H4V6zm0 8h4v4H4v-4zm8-8h8v4h-8V6zm0 8h8v4h-8v-4z'  // Icon mode (switch to full mode)
    : 'M4 6h16v4H4V6zm0 8h16v4H4v-4z'  // Full mode (switch to icon mode)
);

function toggleIconMode() {
    isTransitioning.value = true;

    // Fade out: set 200ms delay to wait for the icon and text to disappear
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
        }, 300);
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
}
function onMouseMove(event) {
    updateMousePosition(event);
}
function updateMousePosition(event) {
    mousePosition.value = {
        x: event.clientX,
        y: event.clientY
    };
    showTooltip.value = true;
    clearTimeout(tooltipTimer.value);
    tooltipTimer.value = setTimeout(() => {
        showTooltip.value = false;
    }, 1500);
}
const onMouseLeave = () => {
    hideHoverSlider();
    showTooltip.value = false;
    clearTimeout(tooltipTimer.value);
    hoveredMenu.value = null;
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

// Add watch effect for debouncedMousePosition
const debouncedMousePosition = useDebounce(mousePosition, 1000);
watch(debouncedMousePosition, () => {
    if (hoveredMenu.value) {
        showTooltip.value = false;
    }
});

// Add this function to handle full-screen toggle
function toggleFullScreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
        isFullScreen.value = true;
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
            isFullScreen.value = false;
        }
    }
}
</script>

<template>
    <nav class="bg-gray-800 w-auto relative z-0 flex flex-row flex-wrap">
        <MainMenu v-for="(menu, index) in menus" :key="menu.id" :toggled="toggled(menu.id)" :menu="menu"
            :isIconMode="isIconMode"
            :class="[menuClass, 'relative z-30 transition-all duration-300', { 'opacity-0': isTransitioning }]"
            @mouseenter="(event) => onMouseEnter(event, index)" @mouseleave="onMouseLeave" @mousemove="onMouseMove"
            @mousedown="onMouseDown(index)" @mouseup="onMouseUp(index)" @click="onClick($event, index)" />

        <Tooltip :text="hoveredMenu ? hoveredMenu.name : ''" :show="hoveredMenu && isIconMode && showTooltip"
            :position="mousePosition" :spaced="true" />

        <div ref="slider"
            :class="[menuClass, 'rounded-xl bg-yellow-500 transition-all ease-out duration-300 absolute z-20', { 'opacity-0': isTransitioning }]">
        </div>
        <div ref="hoverSlider"
            :class="[menuClass, 'rounded-xl bg-yellow-500 transition-all ease-out duration-300 absolute z-10 opacity-0', { 'opacity-0': isTransitioning }]">
        </div>

        <div class="absolute sxga:bottom-3 sxga:right-3 sm:bottom-2.5 sm:right-2.5 flex flex-row-reverse items-center">
            <OverlayBadge value="4" severity="danger" class="inline-flex" size="small">
                <!-- <Avatar icon="pi pi-user" shape="circle" /> -->
                <Avatar icon="pi pi-user" />
            </OverlayBadge>

            <button @click="toggleIconMode" class="text-yellow-500 mr-2 sxga:rounded-md sm:rounded hover:bg-gray-700 focus:outline-none transition-all duration-300 ease-in-out flex items-center justify-center sxga:w-8 sxga:h-8 sm:w-6 sm:h-6">
                <svg xmlns="http://www.w3.org/2000/svg" class="transition-all duration-300" viewBox="0 0 24 24"
                    fill="currentColor">
                    <path :d="switchIcon" />
                </svg>
            </button>
        </div>

    </nav>
</template>

<style scoped>
.main-menu-size {
    @apply sxga:w-24 sxga:h-24 sxga:m-3 sm:w-20 sm:h-20 sm:m-2.5;
}

.main-menu-size-icon-mode {
    @apply sxga:w-12 sxga:h-12 sxga:m-2 sm:w-10 sm:h-10 sm:m-1.5;
}
</style>