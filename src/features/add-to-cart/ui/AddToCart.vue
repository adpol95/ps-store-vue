<script setup lang="ts">
import { Handbag } from "@lucide/vue";

import { Button } from "@/shared/ui";

import { useAddedToCart } from "../model";

const { handleAddToCart } = useAddedToCart();
</script>

<template>
    <Button class="product-card__button" @click="handleAddToCart">
        <Handbag color="white" :size="24" />
    </Button>
</template>
