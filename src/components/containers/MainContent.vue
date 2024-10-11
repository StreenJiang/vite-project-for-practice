<script setup>
import { computed, inject } from 'vue';
import FirstSubNav from '../navs/FirstSubNav.vue';

const currentMenu = inject("currentMenu");
const hasSubMenu = computed(() => {
  return currentMenu && currentMenu.value && currentMenu.value.children && currentMenu.value.children.length > 0;
});
</script>

<template>
  <div class="bg-gray-600 w-full h-full flex">
    <FirstSubNav v-if="hasSubMenu" :menus="currentMenu.children"/>
    <div class="w-full h-full">
      <router-view/>
    </div>
  </div>
</template>