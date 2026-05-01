<script setup lang="ts">
import { ArrowRight, Minus, Plus, ShoppingBag, Trash2, X } from "lucide-vue-next";
import { storeToRefs } from "pinia";

import { useCartStore } from "@/entities/cart";
import { useAppStore } from "@/shared/model";
import { Button } from "@/shared/ui";

const cartStore = useCartStore();
const appStore = useAppStore();
const { items, totalCount, totalPrice, isEmpty } = storeToRefs(cartStore);
const { isCartOpen } = storeToRefs(appStore);

const closeCart = () => {
    appStore.toggleCart(false);
};

const handleUpdateQuantity = (id: string | number, delta: number) => {
    const item = items.value.find((i) => i.item._id === id);
    if (item) {
        cartStore.updateQuantity(id, item.quantity + delta);
    }
};
</script>

<template>
    <Teleport to="body">
        <Transition name="sidebar">
            <!-- eslint-disable-next-line vuejs-accessibility/click-events-have-key-events, vuejs-accessibility/no-static-element-interactions -->
            <div v-if="isCartOpen" class="cart-sidebar-overlay" @click.self="closeCart">
                <aside class="cart-sidebar">
                    <header class="cart-sidebar__header">
                        <div class="header-title">
                            <ShoppingBag :size="24" />
                            <h2>Your Basket</h2>
                            <span v-if="!isEmpty" class="item-count">{{
                                totalCount
                            }}</span>
                        </div>
                        <button class="close-btn" @click="closeCart">
                            <X :size="24" />
                        </button>
                    </header>

                    <main class="cart-sidebar__content">
                        <div v-if="isEmpty" class="empty-cart">
                            <div class="empty-icon">
                                <ShoppingBag :size="64" />
                            </div>
                            <h3>Your basket is empty</h3>
                            <p>
                                Looks like you haven't added anything to your basket yet.
                            </p>
                            <Button variant="primary" @click="closeCart">
                                Start Shopping
                            </Button>
                        </div>

                        <div v-else class="cart-items">
                            <div
                                v-for="item in items"
                                :key="item.item._id"
                                class="cart-item"
                            >
                                <div class="cart-item__image">
                                    <img :src="item.item.img" :alt="item.item.title" />
                                </div>
                                <div class="cart-item__info">
                                    <h4>{{ item.item.title }}</h4>
                                    <p class="cart-item__price">
                                        {{ item.item.price }} ₽
                                    </p>
                                    <div class="cart-item__actions">
                                        <div class="quantity-controls">
                                            <button
                                                class="qty-btn"
                                                :disabled="item.quantity <= 1"
                                                @click="
                                                    handleUpdateQuantity(
                                                        item.item._id,
                                                        -1
                                                    )
                                                "
                                            >
                                                <Minus :size="16" />
                                            </button>
                                            <span class="quantity">{{
                                                item.quantity
                                            }}</span>
                                            <button
                                                class="qty-btn"
                                                @click="
                                                    handleUpdateQuantity(item.item._id, 1)
                                                "
                                            >
                                                <Plus :size="16" />
                                            </button>
                                        </div>
                                        <button
                                            class="remove-btn"
                                            @click="
                                                cartStore.removeFromCart(item.item._id)
                                            "
                                        >
                                            <Trash2 :size="18" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>

                    <footer v-if="!isEmpty" class="cart-sidebar__footer">
                        <div class="summary">
                            <div class="summary-row">
                                <span>Subtotal</span>
                                <span>{{ totalPrice }} ₽</span>
                            </div>
                            <div class="summary-row total">
                                <span>Total</span>
                                <span>{{ totalPrice }} ₽</span>
                            </div>
                        </div>
                        <div class="footer-actions">
                            <Button variant="primary" class="checkout-btn">
                                Checkout
                                <ArrowRight :size="20" />
                            </Button>
                            <button class="clear-btn" @click="cartStore.clearCart">
                                Clear Basket
                            </button>
                        </div>
                    </footer>
                </aside>
            </div>
        </Transition>
    </Teleport>
</template>

<style scoped lang="scss">
.cart-sidebar-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(8px);
    z-index: 2000;
    display: flex;
    justify-content: flex-end;
}

.cart-sidebar {
    width: 100%;
    max-width: 450px;
    background: var(--color-bg);
    height: 100%;
    display: flex;
    flex-direction: column;
    box-shadow: -10px 0 30px rgba(0, 0, 0, 0.5);
    border-left: 1px solid var(--color-border);

    @media (max-width: 480px) {
        max-width: 100%;
    }

    &__header {
        padding: 2rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid var(--color-border);

        @media (max-width: 480px) {
            padding: 1.25rem;
        }

        .header-title {
            display: flex;
            align-items: center;
            gap: 1rem;
            color: var(--color-accent);

            h2 {
                margin: 0;
                font-size: 1.5rem;
                color: white;

                @media (max-width: 480px) {
                    font-size: 1.25rem;
                }
            }

            .item-count {
                background: var(--color-accent);
                color: white;
                padding: 0.2rem 0.6rem;
                border-radius: 1rem;
                font-size: 0.8rem;
                font-weight: 700;
            }
        }

        .close-btn {
            background: transparent;
            border: none;
            color: var(--color-text-muted);
            cursor: pointer;
            transition: color 0.2s;

            &:hover {
                color: white;
            }
        }
    }

    &__content {
        flex: 1;
        overflow-y: auto;
        padding: 2rem;

        @media (max-width: 480px) {
            padding: 1.25rem;
        }
    }

    &__footer {
        padding: 2rem;
        border-top: 1px solid var(--color-border);
        background: var(--color-surface);

        @media (max-width: 480px) {
            padding: 1.25rem;
        }
    }
}

.empty-cart {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    gap: 1.5rem;

    .empty-icon {
        color: var(--color-border);
        margin-bottom: 1rem;
    }

    h3 {
        font-size: 1.5rem;
        margin: 0;
    }

    p {
        color: var(--color-text-muted);
        max-width: 250px;
    }
}

.cart-items {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.cart-item {
    display: flex;
    gap: 1.5rem;
    background: var(--color-surface);
    padding: 1rem;
    border-radius: 1.5rem;
    border: 1px solid var(--color-border);

    &__image {
        width: 80px;
        height: 80px;
        border-radius: 1rem;
        overflow: hidden;
        flex-shrink: 0;

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }

    &__info {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        h4 {
            margin: 0;
            font-size: 1.1rem;
            line-height: 1.2;
        }

        .cart-item__price {
            font-weight: 700;
            color: var(--color-accent);
            margin: 0.25rem 0;
        }
    }

    &__actions {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 0.5rem;
    }
}

.quantity-controls {
    display: flex;
    align-items: center;
    gap: 1rem;
    background: var(--color-bg);
    padding: 0.25rem 0.5rem;
    border-radius: 0.75rem;
    border: 1px solid var(--color-border);

    .qty-btn {
        background: transparent;
        border: none;
        color: var(--color-text-muted);
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;

        &:hover:not(:disabled) {
            color: white;
        }

        &:disabled {
            opacity: 0.3;
            cursor: not-allowed;
        }
    }

    .quantity {
        font-weight: 700;
        min-width: 20px;
        text-align: center;
    }
}

.remove-btn {
    background: transparent;
    border: none;
    color: var(--color-text-muted);
    cursor: pointer;
    transition: color 0.2s;

    &:hover {
        color: #ff4d4d;
    }
}

.summary {
    margin-bottom: 2rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;

    .summary-row {
        display: flex;
        justify-content: space-between;
        color: var(--color-text-muted);

        &.total {
            color: white;
            font-size: 1.5rem;
            font-weight: 800;
            margin-top: 0.5rem;
            padding-top: 0.75rem;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
        }
    }
}

.footer-actions {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    .checkout-btn {
        width: 100%;
        padding: 1.25rem;
        font-size: 1.2rem;
        font-weight: 800;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1rem;
        border-radius: 1.5rem;
    }

    .clear-btn {
        background: transparent;
        border: none;
        color: var(--color-text-muted);
        cursor: pointer;
        font-size: 0.9rem;
        text-decoration: underline;

        &:hover {
            color: white;
        }
    }
}

/* Transitions */
.sidebar-enter-active,
.sidebar-leave-active {
    transition: opacity 0.4s ease;

    .cart-sidebar {
        transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    }
}

.sidebar-enter-from,
.sidebar-leave-to {
    opacity: 0;

    .cart-sidebar {
        transform: translateX(100%);
    }
}
</style>
