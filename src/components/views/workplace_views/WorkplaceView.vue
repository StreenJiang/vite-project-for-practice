<script setup>
import { ref } from "vue";
import Toolbar from 'primevue/toolbar';
import Button from 'primevue/button';
import AutoComplete from 'primevue/autocomplete';
import Select from 'primevue/select';
import FloatLabel from 'primevue/floatlabel';
import Layout1 from './layouts/Layout1.vue';

const missionName = ref(null);
const sideName = ref(null);
const missionMode = ref(null);
const items = ref([]);
const sides = ref([
    {
        name: "产品面1",
        code: "1",
    },
    {
        name: "产品面2",
        code: "2",
    },
]);
const missionModes = ref([
    {
        name: "普通模式",
        code: "1",
    },
    {
        name: "自循环模式",
        code: "2",
    },
    {
        name: "PLC自循环模式",
        code: "3",
    },
    {
        name: "ModBus自循环模式",
        code: "4",
    },
    {
        name: "MES交互模式",
        code: "5",
    },
]);

const search = (event) => {
    items.value = ["测试任务1", "测试任务2", "测试任务3"].map((item) => event.query + '-' + item);
}
</script>

<template>
    <div class="flex flex-col">
        <Toolbar class="toolbar">
            <template #start>
                <FloatLabel class="xga:w-52 sxga:w-60 hdp:w-64 fhd:w-72" variant="on">
                    <AutoComplete v-model="missionName" dropdown inputId="on_label" :suggestions="items" @complete="search" class="autocomplete w-full" />
                    <label for="on_label">任务名称</label>
                </FloatLabel>
                <FloatLabel class="xga:w-32 sxga:w-36 hdp:w-40 fhd:w-48 sxga:ml-3 xga:ml-2" variant="on">
                    <Select v-model="sideName" inputId="on_label" :options="sides" optionLabel="name" class="select w-full" />
                    <label for="on_label">产品面</label>
                </FloatLabel>
            </template>

            <template #end>
                <FloatLabel class="xga:w-44 sxga:w-48 hdp:w-52 fhd:w-56" variant="on">
                    <Select v-model="missionMode" inputId="on_label" :options="missionModes" optionLabel="name" class="select w-full" />
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
    @apply bg-gray-400 border-none rounded-none sxga:p-3 sxga:pt-4 xga:p-2 xga:pt-3;
}
.autocomplete, .select {
    @apply bg-gray-400 sxga:h-10 sxga:text-base xga:h-9 xga:text-sm;
}
button {
    @apply font-black sxga:ml-3 sxga:h-10 sxga:text-sm xga:ml-2 xga:h-9 xga:text-sm;
}
</style>