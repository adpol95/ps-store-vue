<script setup lang="ts">
import { Handbag, Search, User } from "@lucide/vue";

import { Button } from "@/shared/ui";
</script>

<template>
    <header class="header">
        <div class="header__container">
            <RouterLink to="/" class="header__logo">
                <span class="header__logo-text">PS STORE</span>
            </RouterLink>

            <nav class="header__nav">
                <RouterLink to="/games" class="header__link">Игры</RouterLink>
                <RouterLink to="/consoles" class="header__link">Консоли</RouterLink>
                <RouterLink to="/accessories" class="header__link">Аксессуары</RouterLink>
                <RouterLink to="/news" class="header__link">Новости</RouterLink>
            </nav>

            <div class="header__actions">
                <Button variant="outline" size="sm" class="header__action-btn">
                    <Search :size="20" />
                </Button>
                <Button variant="outline" size="sm" class="header__action-btn">
                    <User :size="20" />
                </Button>
                <RouterLink to="/basket" class="header__cart-link">
                    <Button variant="primary" size="sm" class="header__action-btn">
                        <Handbag :size="20" />
                        <span class="header__cart-count">0</span>
                    </Button>
                </RouterLink>
            </div>
        </div>
    </header>
</template>

<style scoped lang="scss">
.header {
    background: color-mix(in srgb, var(--color-bg) 95%, white);
    border-bottom: 1px solid var(--color-border);
    height: 70px;
    display: flex;
    align-items: center;
    position: sticky;
    top: 0;
    z-index: 100;
    backdrop-filter: blur(8px);

    &__container {
        max-width: 1200px;
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
            font-size: 1.2rem;
        }
    }

    &__nav {
        display: flex;
        gap: 2rem;

        @media (max-width: 992px) {
            gap: 1rem;
        }

        @media (max-width: 768px) {
            display: none;
        }
    }

    &__link {
        text-decoration: none;
        color: var(--color-text);
        font-weight: 500;
        font-size: 0.95rem;
        transition: color 0.2s;

        &:hover,
        &.router-link-active {
            color: var(--color-accent);
        }
    }

    &__actions {
        display: flex;
        gap: 0.75rem;
        align-items: center;

        @media (max-width: 480px) {
            gap: 0.5rem;
        }
    }

    &__action-btn {
        padding: 8px !important;
        position: relative;

        @media (max-width: 480px) {
            padding: 6px !important;

            :deep(svg) {
                width: 18px;
                height: 18px;
            }
        }
    }

    &__cart-link {
        text-decoration: none;
    }

    &__cart-count {
        position: absolute;
        top: -5px;
        right: -5px;
        background: var(--color-danger);
        color: white;
        font-size: 0.7rem;
        padding: 2px 5px;
        border-radius: 10px;
        min-width: 14px;
        text-align: center;
    }
}
</style>
