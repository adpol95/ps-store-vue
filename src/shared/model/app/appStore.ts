import { ref } from "vue";
import { defineStore } from "pinia";

export const useAppStore = defineStore("app", () => {
    const isInitialized = ref(false);

    function setInitialized(value: boolean) {
        isInitialized.value = value;
    }

    return {
        isInitialized,
        setInitialized
    };
});
