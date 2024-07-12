<script setup>
import { computed, defineAsyncComponent, onMounted, shallowRef } from 'vue'
import MenuConfig from '../../js/view_models/MenuConfig';
import { isStringEmpty } from '../../js/utils/utils';

const props = defineProps({
    menu: {
        type: MenuConfig,
        default: new MenuConfig(0, "MainMenuName", "", false),
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

const iconColor = computed(() => props.toggled ? "fill-gray-800" : "fill-yellow-500");
const textColor = computed(() => props.toggled ? "text-gray-800" : "text-yellow-500");
</script>

<template>
    <router-link :to="menu.routeTo" class="h-24 w-24 hover:cursor-pointer transition-all duration-300 select-none">
        <component :is="IconSvg" class="icon size-9 duration-300 mx-auto mt-4" :class="iconColor"/>
        <p class="pt-1 font-bold duration-300 text-center" :class="textColor">{{ menu.name }}</p>
    </router-link>
</template>