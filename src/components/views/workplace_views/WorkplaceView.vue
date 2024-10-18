<script setup>
import { onMounted, ref } from "vue";
import Toolbar from 'primevue/toolbar';
import Button from 'primevue/button';
import AutoComplete from 'primevue/autocomplete';
import Select from 'primevue/select';
import FloatLabel from 'primevue/floatlabel';
import Layout1 from './layouts/Layout1.vue';
import { isStringEmpty } from "../../../js/utils/utils";
import { useWorkplaceProductStore } from "../../../stores/workplaceProduct";

const workplaceProductStore = useWorkplaceProductStore();
const productMissionObj = ref(null);
const productSideObj = ref(null);
const missionModeObj = ref(null);

const products = ref([
    { id: 1, name: "测试任务1号" },
    { id: 2, name: "测试任务2号" },
    { id: 3, name: "测试任务3号" },
    { id: 4, name: "测试任务4号" },
]);
const items = ref(null);
const sides = ref([
    { id: 1, name: "产品面1" },
    { id: 2, name: "产品面2" },
    { id: 3, name: "产品面3" },
]);
const missionModes = ref([
    { id: 1, name: "普通模式" },
    { id: 1, name: "自循环模式" },
    { id: 1, name: "PLC自循环模式" },
    { id: 1, name: "ModBus自循环模式" },
    { id: 1, name: "MES交互模式" },
]);

const search = (event) => {
    if (!isStringEmpty(event.query)) {
        items.value = products.value.filter(product => product.name.toLowerCase().includes(event.query.toLowerCase()));
    } else {
        items.value = products.value.slice();
    }
}

const productMissionSelectd = (event) => workplaceProductStore.workplaceProduct.productMission = event.value;
const sideSelectd = (event) => workplaceProductStore.workplaceProduct.side = event.value;
const missionModeSelectd = (event) => workplaceProductStore.workplaceProduct.missionMode = event.value;

onMounted(() => {
    if (workplaceProductStore.workplaceProduct.productMission) {
        productMissionObj.value = workplaceProductStore.workplaceProduct.productMission;
    }
    if (workplaceProductStore.workplaceProduct.side) {
        productSideObj.value = workplaceProductStore.workplaceProduct.side;
    }
    if (workplaceProductStore.workplaceProduct.missionMode) {
        missionModeObj.value = workplaceProductStore.workplaceProduct.missionMode;
    }
});
</script>

<template>
    <div class="flex flex-col">
        <Toolbar class="toolbar">
            <template #start>
                <FloatLabel class="sm:w-52 sxga:w-60 hdp:w-64 fhd:w-72" variant="on">
                    <AutoComplete v-model="productMissionObj" dropdown inputId="on_label" 
                                    optionLabel="name" :suggestions="items" class="autocomplete w-full"
                                    @complete="search" @item-select="productMissionSelectd" />
                    <label for="on_label">任务名称</label>
                </FloatLabel>
                <FloatLabel class="sm:w-32 sxga:w-36 hdp:w-40 fhd:w-48 sxga:ml-3 sm:ml-1.5" variant="on">
                    <Select v-model="productSideObj" inputId="on_label" :options="sides" optionLabel="name" dark="true" class="select w-full"
                            @change="sideSelectd" />
                    <label for="on_label">产品面</label>
                </FloatLabel>
            </template>

            <template #end>
                <FloatLabel class="sm:w-44 sxga:w-48 hdp:w-52 fhd:w-56" variant="on">
                    <Select v-model="missionModeObj" inputId="on_label" :options="missionModes" optionLabel="name" class="select w-full"
                            @change="missionModeSelectd" />
                    <label for="on_label">任务模式</label>
                </FloatLabel>
                <Button label="启动任务" severity="success" />
                <Button label="终止任务" severity="danger" />
            </template>
        </Toolbar>

        <div class="w-full h-full">
            <Layout1 />
        </div>
    </div>
</template>

<style scoped>
.toolbar {
    @apply bg-gray-400 border-none rounded-none sxga:p-3 sxga:pt-4 sm:p-1.5 sm:pt-2.5;
}
.autocomplete, .select {
    @apply sxga:h-10 sxga:text-base sm:h-9 sm:text-sm;
}
button {
    @apply font-black sxga:ml-3 sxga:h-10 sxga:text-sm sm:ml-1.5 sm:h-9 sm:text-sm;
}
</style>