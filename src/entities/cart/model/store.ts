import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { ProductListItem } from "entities/product";

const GUEST_CART_KEY = "ps_guest_cart";

export interface CartItem {
    product: ProductListItem;
    quantity: number;
}

export const useCartStore = defineStore("cart", () => {
    // ── State ─────────────────────────────────────────────────────────────
    const items = ref<CartItem[]>(loadFromStorage());

    // ── Getters ───────────────────────────────────────────────────────────
    const totalItems = computed(() => items.value.reduce((acc, i) => acc + i.quantity, 0));

    const totalPrice = computed(() =>
        items.value.reduce((acc, i) => acc + (i.product.Price ?? 0) * i.quantity, 0),
    );

    const isEmpty = computed(() => items.value.length === 0);

    // ── Helpers ───────────────────────────────────────────────────────────
    function loadFromStorage(): CartItem[] {
        try {
            const raw = localStorage.getItem(GUEST_CART_KEY);
            return raw ? (JSON.parse(raw) as CartItem[]) : [];
        } catch {
            return [];
        }
    }

    function persist() {
        localStorage.setItem(GUEST_CART_KEY, JSON.stringify(items.value));
    }

    function findIndex(productId: string) {
        return items.value.findIndex((i) => i.product._id === productId);
    }

    // ── Actions ───────────────────────────────────────────────────────────
    function addItem(product: ProductListItem, quantity = 1) {
        const idx = findIndex(product._id);
        if (idx >= 0) {
            items.value[idx].quantity += quantity;
        } else {
            items.value.push({ product, quantity });
        }
        persist();
    }

    function removeItem(productId: string) {
        const idx = findIndex(productId);
        if (idx >= 0) {
            items.value.splice(idx, 1);
            persist();
        }
    }

    function updateQuantity(productId: string, quantity: number) {
        if (quantity <= 0) {
            removeItem(productId);
            return;
        }
        const idx = findIndex(productId);
        if (idx >= 0) {
            items.value[idx].quantity = quantity;
            persist();
        }
    }

    function clearCart() {
        items.value = [];
        persist();
    }

    function isInCart(productId: string) {
        return findIndex(productId) >= 0;
    }

    return {
        items,
        totalItems,
        totalPrice,
        isEmpty,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        isInCart,
    };
});
