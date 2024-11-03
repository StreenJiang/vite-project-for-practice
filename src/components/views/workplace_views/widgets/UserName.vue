<script setup>
import { ref } from 'vue';
import FloatLabel from 'primevue/floatlabel';
import InputText from 'primevue/inputtext';
import 'primeicons/primeicons.css'

const userName = ref("操作员一号");

</script>

<template>
    <FloatLabel variant="on">
        <InputText id="userName_label" v-model="userName" disabled class="w-full" />
        <label for="userName_label">用户名称</label>
    </FloatLabel>
</template>