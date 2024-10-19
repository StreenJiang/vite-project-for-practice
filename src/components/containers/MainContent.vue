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
    <transition mode="out-in">
      <FirstSubNav v-if="hasSubMenu" :menus="currentMenu.children"/>
    </transition>

    <RouterView v-slot="{ Component }">
      <transition mode="out-in">
        <component :is="Component" />
      </transition>
    </RouterView>
  </div>
</template>

<style scoped>
.v-enter-active {
  transition: all .2s ease;
}
.v-leave-active {
  transition: all .05s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>