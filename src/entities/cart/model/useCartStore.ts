import { computed, ref, watch } from "vue";
import { defineStore } from "pinia";

import type { AnyProduct } from "@/entities/product";
import { useSessionStore } from "@/entities/session";

import { calculateShipAndTax } from "./calculateShipAndTax";
import type { CartProduct } from "./types";

const CART_STORAGE_KEY = "ps_store_cart";

export const useCartStore = defineStore("cart", () => {
    const sessionStore = useSessionStore();
    const items = ref<CartProduct[]>([]);
    const selectedCountry = ref("Argentina");

    const activeCountry = computed(
        () => sessionStore.user?.country || selectedCountry.value
    );

    const shipAndTax = computed(() => calculateShipAndTax(activeCountry.value));
    const shippingCost = computed(() => shipAndTax.value[0]);
    const taxCost = computed(() => shipAndTax.value[1]);

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

    const subtotal = computed(() =>
        items.value.reduce((sum, item) => {
            const product = item.item as any;
            const price = product.Price || product.price || 0;
            return sum + parsePrice(price) * item.quantity;
        }, 0)
    );

    const totalCount = computed(() =>
        items.value.reduce((sum, item) => sum + item.quantity, 0)
    );

    const totalPrice = computed(
        () => subtotal.value + shippingCost.value + taxCost.value
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

    function setSelectedCountry(country: string) {
        selectedCountry.value = country;
    }

    return {
        items,
        selectedCountry,
        activeCountry,
        totalCount,
        subtotal,
        shippingCost,
        taxCost,
        totalPrice,
        isEmpty,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        setSelectedCountry
    };
});
