<script setup lang="ts">
import type { GameProduct } from "@/entities/product";
import { ProductCard } from "@/entities/product";
import { AddToCart } from "@/features/add-to-cart";

interface Props {
    products: GameProduct[];
}

defineProps<Props>();
</script>

<template>
    <div class="product-grid">
        <ProductCard
            v-for="product in products"
            :key="product._id"
            :product="product"
            class="product-grid__item"
        >
            <template #actions>
                <AddToCart />
            </template>
        </ProductCard>
    </div>
</template>

<style scoped lang="scss">
.product-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 2rem;
    width: 100%;

    @media (max-width: 600px) {
        grid-template-columns: 1fr;
    }
}
</style>
