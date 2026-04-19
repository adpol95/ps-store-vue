import { ref } from "vue";
import { defineStore } from "pinia";

import type { AnyProduct } from "@/entities/product";

import type { CartProduct } from "./types";

export const useCartStore = defineStore("cart", () => {
    const items = ref<CartProduct[]>([]);

    function addToCart(product: AnyProduct) {
        const existing = items.value.find((i) => i.item._id === product._id);
        if (existing) {
            existing.quantity++;
        } else {
            items.value.push({ item: product, quantity: 1 });
        }
    }

    return { items, addToCart };
});
