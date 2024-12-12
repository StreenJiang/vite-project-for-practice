<script setup>
import { onMounted, ref } from 'vue';
import SelectButton from 'primevue/selectbutton';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

const tighteningData = ref([
    {
        id: 1,
        serial_num: 1,
        torque: 2.19,
        angle: 1932,
        tightening_status: 1,
    }, {
        id: 2,
        serial_num: 2,
        torque: 1.31,
        angle: 1211,
        tightening_status: 1,
    }, {
        id: 3,
        serial_num: 3,
        torque: 3.11,
        angle: 2313,
        tightening_status: 2,
    }, {
        id: 4,
        serial_num: 3,
        torque: 2.01,
        angle: 1800,
        tightening_status: 1,
    },
]);

const missionRecord = ref([
    {
        id: 1,
        mission_name: "测试任务1",
        workstation_name: "站点1号",
        mission_status: 1,
    }, {
        id: 2,
        mission_name: "测试任务2",
        workstation_name: "站点2号",
        mission_status: 1,
    }, {
        id: 3,
        mission_name: "测试任务3",
        workstation_name: "站点3号",
        mission_status: 1,
    }
]);

const option = ref({ label: "拧紧数据", value: "null" });
const options = ref([
    { 
        label: "拧紧数据", 
        data: tighteningData.value,
        value: [
            { field: "serial_num", header: "点位号" },
            { field: "torque", header: "扭矩" },
            { field: "angle", header: "角度" },
            { field: "tightening_status", header: "拧紧状态" },
        ], 
    },
    { 
        label: "任务记录", 
        data: missionRecord.value,
        value: [
            { field: "mission_name", header: "任务名称" },
            { field: "workstation_name", header: "工位名称" },
            { field: "mission_status", header: "任务状态" },
        ], 
    },
]);

const items = ref(null);
const columns = ref(null);

const onSelectButtonChanged = (e) => {
    if (e.value) {
        items.value = e.value.data;
        columns.value = e.value.value;
    }
}

onMounted(() => {
    items.value = tighteningData.value;
    columns.value = options.value[0].value;
})

</script>

<template>
    <div class="h-full flex flex-col justify-center items-center">
        <SelectButton v-model="option" :options="options" @change="onSelectButtonChanged" optionLabel="label" dataKey="label" class="mb-3" />
        <DataTable :value="items" paginator scrollable scrollHeight="160px" :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]" tableStyle="min-height: 10rem; min-width: 25rem" class="bg-slate-200">
            <Column v-for="column in columns" :field="column.field" :header="column.header" />
        </DataTable>
    </div>
</template>