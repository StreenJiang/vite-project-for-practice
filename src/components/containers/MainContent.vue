<script setup>
import { computed, inject } from 'vue';
import FirstSubNav from '../navs/FirstSubNav.vue';

const currentMenu = inject("currentMenu");
const hasSubMenu = computed(() => {
  return currentMenu && currentMenu.value && currentMenu.value.children && currentMenu.value.children.length > 0;
});
</script>

<template>
  <div class="bg-gray-600 w-full h-full">
    <FirstSubNav v-if="hasSubMenu" :menus="currentMenu.children"/>
    <router-view/>
  </div>
</template>