<script setup>
import { provide, ref } from 'vue'
import MainNav from './components/navs/MainNav.vue'
import MainContent from './components/containers/MainContent.vue';
import MainFooter from './components/containers/MainFooter.vue';
import { menuConfigs } from './js/configs/configs.js'

const mainMenus = ref(menuConfigs);
const currentMenu = ref(null);
const setCurrentMenu = (value) => currentMenu.value = value;

provide("currentMenu", currentMenu);
</script>

<template>
  <div class="w-screen h-screen flex flex-col justify-between">
    <MainNav :menus="mainMenus" @setCurrentMenu="setCurrentMenu"/>
    <MainContent/>
    <MainFooter/>
  </div>
</template>