<script setup lang="ts">
import { Search, ShoppingBag, User } from "lucide-vue-next";
import { storeToRefs } from "pinia";

import { useCartStore } from "@/entities/cart";
import { useSessionStore } from "@/entities/session";
import { useAppStore } from "@/shared/model";
import { Button } from "@/shared/ui";

const cartStore = useCartStore();
const sessionStore = useSessionStore();
const appStore = useAppStore();
const { totalCount } = storeToRefs(cartStore);

const toggleCart = () => {
    appStore.toggleCart();
};

const handleSearch = () => {
    console.warn("Search functionality coming soon...");
};
</script>

<template>
    <header class="header">
        <div class="header__container">
            <RouterLink to="/" class="header__logo">
                <span class="header__logo-text">PS STORE</span>
            </RouterLink>

            <nav class="header__nav">
                <RouterLink to="/games" class="header__link">Games</RouterLink>
                <RouterLink to="/consoles" class="header__link">Consoles</RouterLink>
                <RouterLink to="/accessories" class="header__link"
                    >Accessories</RouterLink
                >
                <RouterLink to="/news" class="header__link">News</RouterLink>
            </nav>

            <div class="header__actions">
                <Button
                    variant="outline"
                    size="sm"
                    class="header__action-btn"
                    aria-label="Search"
                    @click="handleSearch"
                >
                    <Search :size="20" />
                </Button>
                <RouterLink to="/psn" class="user-btn-link">
                    <Button
                        variant="outline"
                        size="sm"
                        class="header__action-btn user-btn"
                        :class="{ 'is-auth': sessionStore.isAuth }"
                        aria-label="User profile"
                    >
                        <img
                            v-if="sessionStore.isAuth && sessionStore.user?.avatar"
                            :src="sessionStore.user.avatar"
                            class="header__avatar"
                            :alt="sessionStore.user.userName"
                        />

                        <User v-else :size="20" />
                    </Button>
                </RouterLink>
                <Button
                    variant="primary"
                    size="sm"
                    class="header__action-btn cart-btn"
                    aria-label="Open cart"
                    @click="toggleCart"
                >
                    <ShoppingBag :size="20" />
                    <span v-if="totalCount > 0" class="header__cart-count">{{
                        totalCount
                    }}</span>
                </Button>
            </div>
        </div>
    </header>
</template>

<style scoped lang="scss">
.header {
    background: rgba(var(--color-bg-rgb), 0.85);
    border-bottom: 1px solid var(--color-border);
    height: 70px;
    display: flex;
    align-items: center;
    position: sticky;
    top: 0;
    z-index: 1000;
    backdrop-filter: blur(16px);

    @media (max-width: 768px) {
        height: 60px;
    }

    &__container {
        max-width: 1400px;
        margin: 0 auto;
        width: 100%;
        padding: 0 2rem;
        display: flex;
        align-items: center;
        justify-content: space-between;

        @media (max-width: 768px) {
            padding: 0 1rem;
        }
    }

    &__logo {
        text-decoration: none;
        color: var(--color-accent);
        font-weight: 800;
        font-size: 1.5rem;
        letter-spacing: -1px;

        @media (max-width: 480px) {
            font-size: 1.1rem;
        }
    }

    &__nav {
        display: flex;
        gap: 2rem;

        @media (max-width: 992px) {
            gap: 1.5rem;
        }

        @media (max-width: 768px) {
            display: none;
        }
    }

    &__link {
        text-decoration: none;
        color: var(--color-text);
        font-weight: 600;
        font-size: 0.95rem;
        transition: all 0.2s;
        opacity: 0.7;

        &:hover,
        &.router-link-active {
            color: var(--color-accent);
            opacity: 1;
        }
    }

    &__actions {
        display: flex;
        gap: 1rem;
        align-items: center;

        @media (max-width: 480px) {
            gap: 0.5rem;
        }

        .user-btn-link {
            @media (max-width: 768px) {
                display: none;
            }
        }
    }

    &__action-btn {
        &.base-button {
            padding: 10px;
            position: relative;
            border-radius: 12px;

            @media (max-width: 480px) {
                padding: 6px;
                border-radius: 10px;

                :deep(svg) {
                    width: 18px;
                    height: 18px;
                }
            }
        }
    }

    &__avatar {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .user-btn.is-auth {
        &.base-button {
            padding: 0;
            border-color: var(--color-accent);
        }
    }

    .cart-btn {
        background: var(--color-accent);
        border: none;
        box-shadow: 0 4px 15px rgba(var(--color-accent-rgb), 0.3);

        &:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(var(--color-accent-rgb), 0.4);
        }
    }

    &__cart-count {
        position: absolute;
        top: -4px;
        right: -4px;
        background: var(--color-white);
        color: var(--color-accent);
        font-size: 0.7rem;
        font-weight: 800;
        padding: 0 4px;
        border-radius: 10px;
        min-width: 18px;
        height: 18px;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
        z-index: 10;
        line-height: 1;
    }
}
</style>
