<script setup lang="ts">
import { Handbag } from "@lucide/vue";

import { Button } from "@/shared/ui";

import { useAddedToCart } from "../model";

const { handleAddToCart, connected } = useAddedToCart();
</script>

<template>
    <Button class="product-card__button" @click="handleAddToCart">
        <Handbag color="white" :size="24" />
        <div v-if="connected">Connected</div>
        <div v-else>Not Connected</div>
    </Button>
</template>
