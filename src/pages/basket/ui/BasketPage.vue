<script setup lang="ts">
import { Minus, Plus, Trash2 } from "lucide-vue-next";
import { useRouter } from "vue-router";

import { useCartStore } from "@/entities/cart";
import { COUNTRIES } from "@/entities/cart/model/calculateShipAndTax";
import { useSessionStore } from "@/entities/session";
import { MainLayout } from "@/shared/ui";
import { Button } from "@/shared/ui/button";
import { Select } from "@/shared/ui/select";
import { Header } from "@/widgets";

const cartStore = useCartStore();
const sessionStore = useSessionStore();
const router = useRouter();

const countryOptions = COUNTRIES.map((c) => ({ label: c, value: c }));

const proceedToCheckout = () => {
    router.push({
        name: "payment",
        state: {
            cost: cartStore.totalPrice.toFixed(2),
            prod: cartStore.items.map((i) => {
                const item = i.item as any;
                return {
                    _id: item._id,
                    name: item.title || item.name,
                    type: item.type
                };
            })
        }
    });
};
</script>

<template>
    <MainLayout>
        <template #header>
            <Header />
        </template>

        <div class="basket-page">
            <div class="container">
                <header class="basket-page__header">
                    <h1>BASKET</h1>
                </header>

                <div v-if="cartStore.isEmpty" class="basket-page__empty">
                    <h3>Your basket is empty</h3>
                    <RouterLink to="/games">
                        <Button>Go Shopping</Button>
                    </RouterLink>
                </div>

                <div v-else class="basket-page__content">
                    <div class="basket-page__items">
                        <div
                            v-for="item in cartStore.items"
                            :key="item.item._id"
                            class="basket-item"
                        >
                            <img
                                :src="(item.item as any).img || (item.item as any).image"
                                :alt="(item.item as any).title"
                                class="basket-item__image"
                            />
                            <div class="basket-item__info">
                                <h4 class="basket-item__title">
                                    {{
                                        (item.item as any).title ||
                                        (item.item as any).name
                                    }}
                                </h4>
                                <div class="basket-item__price">
                                    Price:
                                    <i>{{
                                        (item.item as any).Price ||
                                        (item.item as any).price
                                    }}</i>
                                </div>
                            </div>
                            <div class="basket-item__controls">
                                <div class="basket-item__quantity">
                                    <button
                                        @click="
                                            cartStore.updateQuantity(
                                                item.item._id,
                                                item.quantity - 1
                                            )
                                        "
                                    >
                                        <Minus :size="16" />
                                    </button>
                                    <span>{{ item.quantity }}</span>
                                    <button
                                        @click="
                                            cartStore.updateQuantity(
                                                item.item._id,
                                                item.quantity + 1
                                            )
                                        "
                                    >
                                        <Plus :size="16" />
                                    </button>
                                </div>
                                <button
                                    class="basket-item__remove"
                                    @click="cartStore.removeFromCart(item.item._id)"
                                >
                                    <Trash2 :size="20" />
                                </button>
                            </div>
                        </div>
                    </div>

                    <aside class="basket-page__summary">
                        <div v-if="!sessionStore.isAuth" class="basket-page__country">
                            <h3>Choose your country</h3>
                            <Select
                                v-model="cartStore.selectedCountry"
                                :options="countryOptions"
                                placeholder="Select Country"
                                aria-label="Select your country"
                            />
                        </div>

                        <div class="order-summary">
                            <h3>Order summary</h3>
                            <div class="order-summary__row">
                                <span>Items ({{ cartStore.totalCount }})</span>
                                <span>{{ cartStore.subtotal.toFixed(2) }}</span>
                            </div>
                            <div class="order-summary__row">
                                <span>Shipping</span>
                                <span>{{ cartStore.shippingCost.toFixed(2) }}</span>
                            </div>
                            <div class="order-summary__row">
                                <span>Region tax</span>
                                <span>{{ cartStore.taxCost.toFixed(2) }}</span>
                            </div>
                            <div class="order-summary__total">
                                <span>Total</span>
                                <span>{{ cartStore.totalPrice.toFixed(2) }}</span>
                            </div>
                            <Button
                                class="order-summary__checkout"
                                @click="proceedToCheckout"
                            >
                                Checkout
                            </Button>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    </MainLayout>
</template>

<style scoped lang="scss">
.basket-page {
    padding: 2rem 0 5rem;
    color: white;

    &__header {
        margin-bottom: 3rem;
        h1 {
            font-size: 2.5rem;
            font-weight: 800;
            letter-spacing: 0.1em;
        }
    }

    &__empty {
        text-align: center;
        padding: 5rem 0;
        background: var(--color-surface);
        border-radius: 2em;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 2rem;

        h3 {
            font-size: 1.5rem;
            color: var(--color-text-muted);
        }
    }

    &__content {
        display: grid;
        grid-template-columns: 1fr 350px;
        gap: 3rem;

        @media (max-width: 1024px) {
            grid-template-columns: 1fr;
        }
    }

    &__items {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
    }

    &__summary {
        display: flex;
        flex-direction: column;
        gap: 2rem;
    }

    &__country {
        background: var(--color-surface);
        padding: 2rem;
        border-radius: 1.5em;
        border: 1px solid var(--color-border);

        h3 {
            margin-bottom: 1rem;
            font-size: 1.2rem;
        }
    }
}

.basket-item {
    background: var(--color-surface);
    padding: 1.5rem;
    border-radius: 1.5em;
    display: flex;
    align-items: center;
    gap: 2rem;
    border: 1px solid var(--color-border);

    &__image {
        width: 100px;
        height: 100px;
        object-fit: cover;
        border-radius: 1rem;
    }

    &__info {
        flex: 1;
    }

    &__title {
        font-size: 1.25rem;
        font-weight: 700;
        margin-bottom: 0.5rem;
    }

    &__price {
        color: var(--color-text-muted);
        i {
            color: var(--color-accent);
            font-weight: 700;
            font-style: normal;
        }
    }

    &__controls {
        display: flex;
        align-items: center;
        gap: 2rem;
    }

    &__quantity {
        display: flex;
        align-items: center;
        background: var(--color-bg);
        border-radius: 2rem;
        padding: 0.5rem;
        gap: 1rem;

        button {
            background: var(--color-surface);
            border: none;
            color: white;
            width: 28px;
            height: 28px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: background 0.2s;

            &:hover {
                background: var(--color-accent);
            }
        }

        span {
            font-weight: 700;
            min-width: 20px;
            text-align: center;
        }
    }

    &__remove {
        background: transparent;
        border: none;
        color: var(--color-danger);
        cursor: pointer;
        padding: 0.5rem;
        border-radius: 0.5rem;
        transition: background 0.2s;

        &:hover {
            background: rgba(255, 94, 94, 0.1);
        }
    }
}

.order-summary {
    background: var(--color-surface);
    padding: 2rem;
    border-radius: 1.5em;
    border: 1px solid var(--color-border);

    h3 {
        margin-bottom: 1.5rem;
        font-size: 1.5rem;
        font-weight: 800;
    }

    &__row {
        display: flex;
        justify-content: space-between;
        margin-bottom: 1rem;
        color: var(--color-text-muted);
        font-size: 1rem;
    }

    &__total {
        display: flex;
        justify-content: space-between;
        margin-top: 1.5rem;
        padding-top: 1.5rem;
        border-top: 1px solid var(--color-border);
        font-size: 1.25rem;
        font-weight: 800;
        color: white;

        span:last-child {
            color: var(--color-accent);
        }
    }

    &__checkout {
        width: 100%;
        margin-top: 2rem;
        padding: 1.25rem;
        font-weight: 800;
        text-transform: uppercase;
        letter-spacing: 0.1em;
    }
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
}

@media (max-width: 640px) {
    .basket-item {
        flex-direction: column;
        text-align: center;

        &__controls {
            width: 100%;
            justify-content: space-between;
        }
    }
}
</style>
