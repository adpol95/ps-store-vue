<script setup lang="ts">
import { computed, ref } from "vue";
import { AlertCircle, CheckCircle2, Wallet } from "lucide-vue-next";
import { useRouter } from "vue-router";

import { useCartStore } from "@/entities/cart";
import { useSessionStore } from "@/entities/session";
import { checkoutOrder } from "@/entities/user/model/userService";
import { MainLayout } from "@/shared/ui";
import { Button } from "@/shared/ui/button";
import { Header } from "@/widgets";

const router = useRouter();
const sessionStore = useSessionStore();
const cartStore = useCartStore();

const orderState = history.state as any as {
    cost: string;
    prod: Array<{ _id: string; name: string; type: string }>;
};
const totalCost = computed(() => parseFloat(orderState?.cost || "0"));

const isProcessing = ref(false);
const error = ref<string | null>(null);

const canPay = computed(() => {
    if (!sessionStore.user) return false;
    return sessionStore.user.wallet >= totalCost.value;
});

const handlePayment = async () => {
    if (!sessionStore.user || !orderState) return;

    isProcessing.value = true;
    error.value = null;

    try {
        const ownership = {
            games: [
                ...sessionStore.user.ownership.games,
                ...orderState.prod.filter((p) => p.type === "Games")
            ],
            consoles: [
                ...sessionStore.user.ownership.consoles,
                ...orderState.prod.filter((p) => p.type === "Consoles")
            ],
            accessories: [
                ...sessionStore.user.ownership.accessories,
                ...orderState.prod.filter((p) => p.type === "Accessories")
            ]
        };

        const payload = {
            ownership,
            wallet: sessionStore.user.wallet - totalCost.value,
            cart: []
        };

        await checkoutOrder(sessionStore.user._id, payload);

        // Update local state
        sessionStore.user.wallet = payload.wallet;
        sessionStore.user.ownership = ownership;
        cartStore.clearCart();

        alert("Congrats with your new purchase");
        router.push("/psn");
    } catch (e) {
        console.error(e);
        error.value = "Payment failed. Please try again.";
    } finally {
        isProcessing.value = false;
    }
};
</script>

<template>
    <MainLayout>
        <template #header>
            <Header />
        </template>

        <div class="payment-page">
            <div class="container">
                <header class="payment-page__header">
                    <h1>PAYMENT</h1>
                </header>

                <div v-if="!orderState" class="payment-page__empty">
                    <AlertCircle :size="48" />
                    <h3>No active order found</h3>
                    <RouterLink to="/basket">
                        <Button>Back to Basket</Button>
                    </RouterLink>
                </div>

                <div v-else class="payment-page__content">
                    <div class="payment-card">
                        <div class="payment-card__total">
                            <span>Total cost</span>
                            <span class="price">{{ totalCost.toFixed(2) }}</span>
                        </div>

                        <div
                            v-if="sessionStore.isAuth && sessionStore.user"
                            class="payment-auth"
                        >
                            <div class="wallet-info">
                                <div class="wallet-info__label">
                                    <Wallet :size="20" />
                                    <span>Your wallet balance</span>
                                </div>
                                <div
                                    class="wallet-info__value"
                                    :class="{ error: !canPay }"
                                >
                                    {{ sessionStore.user.wallet.toFixed(2) }}
                                </div>
                            </div>

                            <div v-if="!canPay" class="payment-error">
                                <AlertCircle :size="20" />
                                <span
                                    >You have not enough money for paying this order</span
                                >
                            </div>

                            <Button
                                class="payment-action"
                                :disabled="!canPay || isProcessing"
                                @click="handlePayment"
                            >
                                {{
                                    isProcessing
                                        ? "Processing..."
                                        : "Finish your order and pay"
                                }}
                            </Button>
                        </div>

                        <div v-else class="payment-guest">
                            <h3>To make a payment you have to:</h3>
                            <div class="guest-options">
                                <RouterLink to="/authorization/registration" class="link"
                                    >register</RouterLink
                                >
                                <span>or</span>
                                <RouterLink to="/authorization" class="link"
                                    >login</RouterLink
                                >
                            </div>
                            <p>Or earn our ecosystem coins in conundrum games.</p>
                        </div>
                    </div>

                    <div class="order-preview">
                        <h3>Items in Order</h3>
                        <div class="order-preview__list">
                            <div
                                v-for="item in orderState.prod"
                                :key="item._id"
                                class="order-preview__item"
                            >
                                <CheckCircle2 :size="16" color="var(--color-accent)" />
                                <span>{{ item.name }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </MainLayout>
</template>

<style scoped lang="scss">
.payment-page {
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
        gap: 1.5rem;
        color: var(--color-text-muted);
    }

    &__content {
        display: grid;
        grid-template-columns: 1fr 400px;
        gap: 3rem;

        @media (max-width: 1024px) {
            grid-template-columns: 1fr;
        }
    }
}

.payment-card {
    background: var(--color-surface);
    padding: 3rem;
    border-radius: 2em;
    border: 1px solid var(--color-border);
    display: flex;
    flex-direction: column;
    gap: 2.5rem;

    &__total {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        span:first-child {
            color: var(--color-text-muted);
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.1em;
        }
        .price {
            font-size: 3rem;
            font-weight: 800;
            color: var(--color-accent);
        }
    }
}

.wallet-info {
    background: var(--color-bg);
    padding: 1.5rem;
    border-radius: 1.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

    &__label {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        color: var(--color-text-muted);
    }

    &__value {
        font-size: 1.5rem;
        font-weight: 700;

        &.error {
            color: var(--color-danger);
        }
    }
}

.payment-error {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    color: var(--color-danger);
    background: rgba(255, 94, 94, 0.1);
    padding: 1rem;
    border-radius: 1rem;
    margin-top: 1rem;
}

.payment-action {
    width: 100%;
    padding: 1.5rem;
    font-weight: 800;
    font-size: 1.1rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin-top: 1rem;
}

.payment-guest {
    h3 {
        margin-bottom: 1.5rem;
        font-size: 1.4rem;
    }

    .guest-options {
        display: flex;
        align-items: center;
        gap: 1rem;
        margin-bottom: 1.5rem;
        font-size: 1.25rem;

        .link {
            color: var(--color-accent);
            font-weight: 700;
            text-decoration: underline;
        }
    }

    p {
        color: var(--color-text-muted);
    }
}

.order-preview {
    background: var(--color-surface);
    padding: 2rem;
    border-radius: 2em;
    border: 1px solid var(--color-border);
    height: fit-content;

    h3 {
        margin-bottom: 2rem;
        font-size: 1.5rem;
        font-weight: 800;
    }

    &__list {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    &__item {
        display: flex;
        align-items: center;
        gap: 1rem;
        font-size: 1rem;
        color: var(--color-text);
    }
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
}
</style>
