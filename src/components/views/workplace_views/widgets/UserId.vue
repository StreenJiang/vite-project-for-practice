<script setup>
import { ref } from 'vue';
import FloatLabel from 'primevue/floatlabel';
import InputText from 'primevue/inputtext';
import 'primeicons/primeicons.css'

const userId = ref("001");

</script>

<template>
    <FloatLabel variant="on">
        <InputText id="userId_label" v-model="userId" disabled class="w-full" />
        <label for="userId_label">用户ID</label>
    </FloatLabel>
</template>