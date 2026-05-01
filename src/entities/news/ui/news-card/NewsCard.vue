<script setup lang="ts">
import type { News } from "../../model/types";

interface Props {
    news: News;
}

defineProps<Props>();
</script>

<template>
    <div class="news-card">
        <div class="news-card__image-wrapper">
            <img :src="news.img" :alt="news.title" class="news-card__image" />
        </div>
        <div class="news-card__content">
            <h3 class="news-card__title">{{ news.title }}</h3>
            <div class="news-card__footer">
                <span class="news-card__category">{{ news.category.toUpperCase() }}</span>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.news-card {
    display: flex;
    flex-direction: column;
    background: var(--color-surface);
    border-radius: 2em;
    overflow: hidden;
    box-shadow: var(--shadow-soft);
    transition:
        transform 0.2s ease-in-out,
        background 0.2s;
    cursor: pointer;
    height: 100%;
    border: 1px solid var(--color-border);

    &:hover {
        transform: translateY(-8px);
        background: color-mix(in srgb, var(--color-surface) 90%, white);
    }

    &__image-wrapper {
        position: relative;
        padding-top: 56.25%; // 16:9 aspect ratio
        overflow: hidden;
    }

    &__image {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    &__content {
        padding: 1.5rem;
        display: flex;
        flex-direction: column;
        flex-grow: 1;
    }

    &__title {
        font-size: 1.25rem;
        font-weight: 700;
        margin-bottom: 1rem;
        line-height: 1.3;
        color: white;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }

    &__footer {
        margin-top: auto;
    }

    &__category {
        font-size: 0.8rem;
        font-weight: 800;
        color: var(--color-accent);
        letter-spacing: 0.1em;
        text-transform: uppercase;
    }
}
</style>
