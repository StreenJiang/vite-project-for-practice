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
const menuClass = computed(() => props.isIconMode ? 'h-12 w-12' : 'h-24 w-24');
</script>

<template>
    <router-link :to="menu.routeTo" :class="[menuClass, 'hover:cursor-pointer transition-all duration-300 select-none flex flex-col items-center justify-center']">
        <component :is="IconSvg" :class="['icon duration-300', iconColor, props.isIconMode ? 'size-6' : 'size-9']"/>
        <p v-if="!isIconMode" class="pt-1 font-bold duration-300 text-center" :class="textColor">{{ menu.name }}</p>
    </router-link>
</template>