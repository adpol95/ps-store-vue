<script setup lang="ts">
import { ShoppingBag } from "lucide-vue-next";

import type { AnyProduct } from "@/entities/product";
import { Button } from "@/shared/ui";

import { useAddedToCart } from "../model";

interface Props {
    product: AnyProduct;
}

const props = defineProps<Props>();
const { handleAddToCart } = useAddedToCart();
</script>

<template>
    <Button
        class="add-to-cart-button"
        variant="primary"
        size="sm"
        @click.stop.prevent="handleAddToCart(props.product)"
    >
        <ShoppingBag :size="20" />
    </Button>
</template>

<style scoped lang="scss">
.add-to-cart-button {
    border-radius: 50%;
    width: 44px;
    height: 44px;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);

    &:active {
        transform: scale(0.9);
    }
}
</style>
