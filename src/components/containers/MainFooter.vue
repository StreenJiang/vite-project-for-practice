<script setup>
import { ref } from 'vue';
import DeviceBlock from "../reusables/DeviceBlock.vue";

</script>
<template>
    <footer class="w-full h-auto bg-slate-700 flex items-center justify-end">
        <DeviceBlock class="bg-gray-400" />
        <DeviceBlock />
        <DeviceBlock />
        <DeviceBlock />
    </footer>
</template>

<style scoped>
.select {
    @apply bg-gray-400 sxga:h-10 sxga:text-base sm:h-9 sm:text-sm;
}
</style>