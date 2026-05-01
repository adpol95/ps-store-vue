import { ref } from "vue";
import { defineStore } from "pinia";

export const useAppStore = defineStore("app", () => {
    const isInitialized = ref(false);
    const isCartOpen = ref(false);

    function setInitialized(value: boolean) {
        isInitialized.value = value;
    }

    function toggleCart(value?: boolean) {
        isCartOpen.value = value ?? !isCartOpen.value;
    }

    return {
        isInitialized,
        isCartOpen,
        setInitialized,
        toggleCart
    };
});
