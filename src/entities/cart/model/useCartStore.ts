import { computed, ref, watch } from "vue";
import { defineStore } from "pinia";

import type { AnyProduct } from "@/entities/product";

import type { CartProduct } from "./types";

const CART_STORAGE_KEY = "ps_store_cart";

export const useCartStore = defineStore("cart", () => {
    const items = ref<CartProduct[]>([]);

    // Load from localStorage
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (savedCart) {
        try {
            items.value = JSON.parse(savedCart);
        } catch (e) {
            console.error("Failed to parse cart from localStorage", e);
        }
    }

    // Persist to localStorage
    watch(
        items,
        (newItems) => {
            localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(newItems));
        },
        { deep: true }
    );

    const parsePrice = (price: string | number | undefined): number => {
        if (typeof price === "number") return price;
        if (typeof price === "string") {
            const numeric = price.replace(/[^0-9]/g, "");
            return numeric ? parseInt(numeric, 10) : 0;
        }
        return 0;
    };

    const totalCount = computed(() =>
        items.value.reduce((sum, item) => sum + item.quantity, 0)
    );

    const totalPrice = computed(() =>
        items.value.reduce(
            (sum, item) => sum + parsePrice(item.item.price) * item.quantity,
            0
        )
    );

    const isEmpty = computed(() => items.value.length === 0);

    function addToCart(product: AnyProduct) {
        const existing = items.value.find((i) => i.item._id === product._id);
        if (existing) {
            existing.quantity++;
        } else {
            items.value.push({ item: product, quantity: 1 });
        }
    }

    function removeFromCart(productId: string | number) {
        items.value = items.value.filter((i) => i.item._id !== productId);
    }

    function updateQuantity(productId: string | number, quantity: number) {
        const item = items.value.find((i) => i.item._id === productId);
        if (item) {
            item.quantity = Math.max(0, quantity);
            if (item.quantity === 0) {
                removeFromCart(productId);
            }
        }
    }

    function clearCart() {
        items.value = [];
    }

    return {
        items,
        totalCount,
        totalPrice,
        isEmpty,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart
    };
});
