<script setup>
import { computed, defineAsyncComponent, onMounted, shallowRef } from 'vue'
import MenuConfig from '../../js/view_models/MenuConfig';
import { isStringEmpty } from '../../js/utils/utils';

const props = defineProps({
    menu: {
        type: MenuConfig,
        default: new MenuConfig(0, "子菜单名字很长", "", false),
    },
    toggled: {
        type: Boolean,
        default: false,
    },
});

const IconSvg = shallowRef(null);
onMounted(() => {
    let iconPath = "../icon_svgs/DefaultSvg.vue";
    if (!isStringEmpty(props.menu.icon)) {
        iconPath = `../icon_svgs/${props.menu.icon}`;
    }

    IconSvg.value = defineAsyncComponent(() => import(iconPath));
});

const iconColor = computed(() => props.toggled ? "fill-gray-800" : "fill-gray-400");
const textColor = computed(() => props.toggled ? "text-gray-800" : "text-gray-400");
const showToggleBar = computed(() => props.toggled ? "opacity-100 w-2" : "opacity-0 w-0");
</script>

<template>
    <router-link :to="menu.routeTo" class="m-2 rounded-xl h-12 w-52 hover:cursor-pointer transition-all duration-300 select-none flex">
        <div class="h-6 bg-gray-800 rounded-full ml-3 mr-1 my-auto transition-all duration-300" :class="showToggleBar"></div>
        <component :is="IconSvg" class="icon size-7 duration-300 mx-3 my-auto" :class="iconColor"/>
        <p class="text-nowrap mx-3 font-bold duration-300 ml-1 my-auto flex-grow" :class="textColor">{{ menu.name }}</p>
    </router-link>
</template>