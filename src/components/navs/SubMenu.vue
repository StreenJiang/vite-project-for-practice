<script setup>
import { computed, defineAsyncComponent, onMounted, shallowRef } from 'vue'
import MenuConfig from '../../js/view_models/MenuConfig';
import { isStringEmpty } from '../../js/utils/utils';

const props = defineProps({
    menu: {
        type: MenuConfig,
        default: new MenuConfig(0, "XXXXXX", "", false),
    },
    toggled: {
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

const iconColor = computed(() => props.toggled ? "fill-gray-800" : "fill-gray-400");
const textColor = computed(() => props.toggled ? "text-gray-800" : "text-gray-400");
const showToggleBar = computed(() => props.toggled ? "opacity-100 sxga:w-2 xga:w-1.5" : "opacity-0 w-0");
</script>

<template>
    <router-link :to="menu.routeTo" class="m-2 rounded-xl h-12 w-52 hover:cursor-pointer transition-all duration-300 select-none flex">
        <div class="sxga:h-6 xga:h-4 bg-gray-800 rounded-full sxga:ml-3 sxga:mr-1 xga:ml-2.5 xga:mr-0.5 my-auto transition-all duration-300" :class="showToggleBar"></div>
        <component :is="IconSvg" class="icon duration-300 my-auto sxga:size-7 sxga:mx-3 xga:size-5 xga:mx-2" :class="iconColor"/>
        <p class="text-nowrap font-bold duration-300 my-auto flex-grow sxga:mx-3 sxga:ml-1 sxga:text-base xga:mx-2.5 xga:ml-0.5 xga:text-sm" :class="textColor">{{ menu.name }}</p>
    </router-link>
</template>