<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  text: {
    type: String,
    required: true
  },
  show: {
    type: Boolean,
    default: false
  },
  position: {
    type: Object,
    default: () => ({ x: 0, y: 0 })
  },
  spaced: {
    type: Boolean,
    default: false
  }
});

const spacedText = computed(() => {
  return props.spaced ? props.text.split('').join('\u200A') : props.text;
});
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="show" 
           class="fixed z-[9999] bg-gray-700 text-white px-2 py-1 rounded-md text-sm whitespace-nowrap pointer-events-none shadow-lg tracking-normal"
           :style="{ left: `${position.x + 10}px`, top: `${position.y + 10}px` }">
        {{ spacedText }}
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, visibility 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  visibility: hidden;
}
</style>