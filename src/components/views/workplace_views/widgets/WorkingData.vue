<script setup>
import { ref } from 'vue';
import SelectButton from 'primevue/selectbutton';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

const option = ref({ label: "拧紧数据", value: "null" });
const options = ref([
    { label: "拧紧数据", value: "null", },
    { label: "任务记录", value: "null", },
]);

const tighteningData = ref([
    {
        serial_num: 1,
    },
]);

const missionRecord = ref([

]);

</script>

<template>
    <div class="h-full flex flex-col justify-center items-center">
        <SelectButton v-model="option" :options="options" optionLabel="label" dataKey="label" class="mb-3" />
        <DataTable :value="customers" paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]" tableStyle="min-height: 10rem" class="bg-slate-200">
            <Column field="name" header="Name" style="width: 25%"></Column>
            <Column field="country.name" header="Country" style="width: 25%"></Column>
            <Column field="company" header="Company" style="width: 25%"></Column>
            <Column field="representative.name" header="Representative" style="width: 25%"></Column>
        </DataTable>
    </div>
</template>