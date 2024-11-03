<script setup>
import { ref } from 'vue';
import FloatLabel from 'primevue/floatlabel';
import InputText from 'primevue/inputtext';
import 'primeicons/primeicons.css'

const parameterSet = ref(1);

</script>

<template>
    <FloatLabel variant="on">
        <InputText id="parameterSet_label" v-model="parameterSet" disabled class="w-full" />
        <label for="parameterSet_label">程序号</label>
    </FloatLabel>
</template>