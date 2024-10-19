import { reactive } from 'vue';
import { defineStore } from 'pinia';

export const useWorkplaceStore = defineStore('workplace', () => {
    const workplace = reactive({
        productMission: null,
        side: null,
    });

    return { workplace };
});