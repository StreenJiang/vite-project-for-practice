<script setup>
import { computed, defineAsyncComponent, onMounted, shallowRef } from 'vue'
import MenuConfig from '../../js/view_models/MenuConfig';
import { isStringEmpty } from '../../js/utils/utils';

const props = defineProps({
    menu: {
        type: MenuConfig,
        default: new MenuConfig(0, "MainMenuName", ""),
    },
    toggled: {
        type: Boolean,
        default: false,
    },
    isIconMode: {
        type: Boolean,
        default: false,
    },
});

const IconSvg = shallowRef(null);
onMounted(() => {
    let iconPath = isStringEmpty(props.menu.icon) ?
                "../icon_svgs/DefaultSvg.vue" : 
                `../icon_svgs/${props.menu.icon}`;

    IconSvg.value = defineAsyncComponent(() => import(/* @vite-ignore */ iconPath));
});

const iconColor = computed(() => props.toggled ? "fill-gray-800" : "fill-yellow-500");
const textColor = computed(() => props.toggled ? "text-gray-800" : "text-yellow-500");
const menuClass = computed(() => props.isIconMode ? 'sxga:h-12 sxga:w-12 xga:h-8 xga:w-8' : 'sxga:h-24 sxga:w-24 xga:h-20 xga:w-20');
</script>

<template>
    <router-link :to="menu.routeTo" :class="[menuClass, 'hover:cursor-pointer transition-all duration-300 select-none flex flex-col items-center justify-center']">
        <component :is="IconSvg" :class="['icon duration-300', iconColor, props.isIconMode ? 'sxga:size-6 xga:size-5' : 'sxga:size-9 xga:size-7']"/>
        <p v-if="!isIconMode" class="pt-1 font-bold duration-300 text-center sxga:text-base xga:text-sm" :class="textColor">{{ menu.name }}</p>
    </router-link>
</template>