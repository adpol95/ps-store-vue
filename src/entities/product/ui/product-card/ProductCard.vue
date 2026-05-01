<script setup lang="ts">
import type { GameProduct } from "../../model/types";

interface Props {
    product: GameProduct;
}

defineProps<Props>();
</script>

<template>
    <div class="product-card">
        <RouterLink :to="`/games/${product._id}`" class="product-card__image-link">
            <div class="product-card__image-container">
                <img
                    :src="product.img"
                    :alt="product.title"
                    class="product-card__image"
                />
                <div v-if="product.price" class="product-card__price">
                    {{ product.price }}
                </div>
            </div>
        </RouterLink>

        <div class="product-card__content">
            <div class="product-card__info">
                <span class="product-card__genre">{{ product.genre }}</span>
                <h3 class="product-card__title">{{ product.title }}</h3>
            </div>
            <div class="product-card__actions">
                <slot name="actions" />
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.product-card {
    display: flex;
    flex-direction: column;
    background: color-mix(in srgb, var(--color-surface) 10%, var(--color-bg));
    border-radius: 1.5rem;
    overflow: hidden;
    transition:
        transform 0.3s ease,
        box-shadow 0.3s ease;
    border: 1px solid var(--color-border);
    height: 100%;

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);

        .product-card__title {
            color: var(--color-accent);
        }
    }

    &__image-link {
        text-decoration: none;
    }

    &__image-container {
        position: relative;
        aspect-ratio: 16 / 9;
        overflow: hidden;
        background: #000;
    }

    &__image {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.5s ease;
    }

    &:hover &__image {
        transform: scale(1.05);
    }

    &__price {
        position: absolute;
        top: 1rem;
        right: 1rem;
        background: var(--color-accent);
        color: white;
        padding: 0.5rem 1rem;
        border-radius: 0.75rem;
        font-weight: 700;
        font-size: 0.9rem;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    }

    &__content {
        padding: 1.5rem;
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        flex: 1;
    }

    &__info {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
    }

    &__genre {
        color: var(--color-text-muted);
        font-size: 0.8rem;
        text-transform: uppercase;
        letter-spacing: 1px;
    }

    &__title {
        margin: 0;
        font-size: 1.1rem;
        font-weight: 600;
        color: var(--color-text);
        transition: color 0.2s;
        line-height: 1.3;
    }

    &__actions {
        display: flex;
        align-items: center;
    }
}
</style>
