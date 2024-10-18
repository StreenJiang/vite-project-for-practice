import { reactive } from 'vue';
import { defineStore } from 'pinia';

export const useWorkplaceProductStore = defineStore('product', () => {
    const workplaceProduct = reactive({
        productMission: null,
        side: null,
        missionMode: null,
    });

    return { workplaceProduct };
});