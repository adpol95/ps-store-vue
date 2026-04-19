<script setup lang="ts">
interface Props {
    title: string;
    genre: string;
    price: number;
    image: string;
    imageAlt: string;
    linkTo: string;
}

withDefaults(defineProps<Props>(), {});
</script>

<template>
    <div class="game-pack">
        <div class="game-pack__top">
            <img :src="image" :alt="imageAlt" />
            <div class="game-pack__price">{{ price }}</div>
        </div>
        <div class="game-pack__down">
            <div class="game-pack__down--left">
                <h4 class="game-pack__down--genre">
                    {{ genre }}
                </h4>
                <h4 class="game-pack__down--title">
                    {{ title }}
                </h4>
            </div>
            <div class="game-pack__down--right">
                <slot name="actions" />
            </div>
        </div>
    </div>
</template>

<style scoped>
.game-pack {
    display: flex;
    flex-direction: column;
    position: relative;
    box-shadow: var(--shadow-soft);
    border-radius: 2em;
    background: color-mix(in srgb, var(--color-text) 88%, var(--color-bg));
    text-decoration: none;
}

@media (max-width: 810px) {
    .game-pack {
        width: 100%;
    }
}

@media (min-width: 810.2px) {
    .game-pack {
        width: 22.5%;
    }
}

@media (min-width: 1200px) {
    .game-pack {
        width: 23.2%;
    }
}

.game-pack .game-pack__top {
    height: 13em;
    background: var(--color-text);
    border-radius: 2em;
}

.game-pack .game-pack__top img {
    box-shadow: var(--shadow-soft);
    border-radius: 2em;
    width: 100%;
    height: 13em;
    object-fit: cover;
    object-position: 0 25%;
}

.game-pack .game-pack__top .game-pack__price {
    position: absolute;
    top: 1em;
    right: 1em;
    background: var(--color-surface);
    color: var(--color-text);
    box-shadow: var(--shadow-soft);
    padding: 0.7em;
    border-radius: 0.7em;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 500;
}

.game-pack .game-pack__down {
    padding: 2.5em 1em 1.5em 1em;
    border-bottom-left-radius: 2em;
    border-bottom-right-radius: 2em;
    background: color-mix(in srgb, var(--color-text) 88%, var(--color-bg));
    display: flex;
    flex-direction: row;
    align-items: center;
    cursor: pointer;
    justify-content: space-between;
}

.game-pack .game-pack__down:hover .game-pack__down--title {
    color: var(--color-accent);
}

.game-pack .game-pack__down:hover .game-pack__down--right {
    background: var(--color-accent);
}

.game-pack .game-pack__down .game-pack__down--left {
    display: flex;
    flex-direction: column;
    row-gap: 0.3em;
}

.game-pack .game-pack__down .game-pack__down--left .game-pack__down--title {
    color: var(--color-bg);
    margin: 0;
    padding: 0 0.5em;
    transition: color 0.3s;
}

.game-pack .game-pack__down .game-pack__down--left .game-pack__down--genre {
    color: var(--color-text-muted);
    margin: 0;
    padding: 0 0.5em;
    font-weight: 300;
}

.game-pack .game-pack__down .game-pack__down--right {
    background: var(--color-bg);
    display: flex;
    align-items: center;
    padding: 0.8em;
    border-radius: 2em;
    box-shadow: var(--shadow-soft);
    transition: background 0.3s;
}

.game-pack .game-pack__down .game-pack__down--right :deep(.product-card__button),
.game-pack .game-pack__down .game-pack__down--right :deep(.btn) {
    padding: 0;
    border: none;
    background: transparent;
    display: flex;
    align-items: center;
}
</style>
