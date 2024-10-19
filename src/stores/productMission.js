import { ref, reactive } from 'vue';
import { defineStore } from 'pinia';

export const useProductMissionStore = defineStore('productMission', () => {
    const missionMode = ref(null);
    const productMission = reactive({});

    const getMissionMode = () => {
        // TODO: Get from local storage, if local storage is not empty, get it and set it to missionMode

        return missionMode;
    };
    const setMissionMode = (mode) => {
        missionMode.value = mode;

        // TODO: Store mission mode in local storage
    };

    return { productMission, getMissionMode, setMissionMode };
});