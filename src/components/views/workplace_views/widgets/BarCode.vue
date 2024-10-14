<script setup>
import { ref } from 'vue';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import ScanBarCodeSvg from '../../../icon_svgs/ScanBarCodeSvg.vue';
import InputText from 'primevue/inputtext';

const productBarCode = ref(null);

</script>

<template>
    <IconField class="sxga:h-14 xga:h-10">
        <InputIcon>
            <ScanBarCodeSvg class="size-4 fill-gray-900" />
        </InputIcon>
        <InputText v-model="productBarCode" placeholder="点击或直接扫码录入产品条码信息" class="w-full h-full" />
    </IconField>
</template>