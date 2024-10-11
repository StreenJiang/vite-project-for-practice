<script setup>
import Toolbar from 'primevue/toolbar';
import Button from 'primevue/button';
import AutoComplete from 'primevue/autocomplete';
import Select from 'primevue/select';
import FloatLabel from 'primevue/floatlabel';
import { ref } from "vue";

const value1 = ref(null);
const value2 = ref(null);
const value3 = ref(null);
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
    <Toolbar id="toolbar">
        <template #start>
            <FloatLabel class="lg:w-56 xl:w-72" variant="on">
                <AutoComplete v-model="value1" dropdown inputId="on_label" :suggestions="items" @complete="search" class="w-full" />
                <label for="on_label">任务名称</label>
            </FloatLabel>
            <FloatLabel class="lg:w-36 xl:w-48 ml-3" variant="on">
                <Select v-model="value2" inputId="on_label" :options="sides" optionLabel="name" class="w-full" />
                <label for="on_label">产品面</label>
            </FloatLabel>
        </template>

        <template #end>
            <FloatLabel class="lg:w-48 xl:w-56" variant="on">
                <Select v-model="value3" inputId="on_label" :options="missionModes" optionLabel="name" class="w-full" />
                <label for="on_label">任务模式</label>
            </FloatLabel>
            <Button label="启动任务" severity="success" />
            <Button label="终止任务" severity="danger" />
        </template>
    </Toolbar>

    <!-- <div class="bg-gray-400 w-full h-full">
    
    </div> -->
</template>

<style scoped>
#toolbar {
    @apply bg-gray-500 border-none rounded-none p-3 pt-4;
}
button {
    @apply ml-3;
}
</style>