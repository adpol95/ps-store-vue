<script setup lang="ts">
import { ProductCard } from "@/entities/product";
import { AddToCart } from "@/features/add-to-cart";
</script>

<template>
    <ProductCard
        genre="Sports"
        image="https://image.api.playstation.com/vulcan/ap/rnd/202512/1205/79661d7a2bdb9784749b4e57e1456ca89f7ac7bed8615aee.png?w=620&thumb=false"
        title="Resident Evil 9"
        :price="34"
        image-alt="alt"
        link-to="https://store.playstation.com/ru-ua/concept/10015533"
    >
        <template #actions>
            <AddToCart />
        </template>
    </ProductCard>
</template>
