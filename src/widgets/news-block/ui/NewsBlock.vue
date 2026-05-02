<script setup lang="ts">
import { computed, ref } from "vue";
import { useQuery } from "@tanstack/vue-query";

import { MOCK_NEWS, NewsCard, type NewsCategory } from "@/entities/news";
import { getNewsList } from "@/entities/news/api/newsService";
import { Button } from "@/shared/ui/button";
import { Spinner } from "@/shared/ui/spinner";

const categories: NewsCategory[] = ["ps5", "ps-vr2", "ps4", "ps-store", "ps-plus"];
const activeCategory = ref<NewsCategory | "all">("all");
const currentPage = ref(1);

const {
    data: news,
    isLoading,
    isFetching,
    isError
} = useQuery({
    queryKey: computed(() => ["news", activeCategory.value, currentPage.value]),
    queryFn: () => getNewsList(activeCategory.value, currentPage.value),
    placeholderData: (prev) => prev
});

const isDataLoading = computed(() => isLoading.value || isFetching.value);

const displayNews = computed(() => {
    if (isLoading.value && !news.value) return [];
    if (isError.value || !news.value || news.value.length === 0) {
        // Fallback to mocks if API fails or returns nothing (for development)
        if (activeCategory.value === "all") return MOCK_NEWS;
        return MOCK_NEWS.filter((n) => n.category === activeCategory.value);
    }
    return news.value;
});

const setCategory = (category: NewsCategory | "all") => {
    activeCategory.value = category;
    currentPage.value = 1;
};
</script>

<template>
    <section class="news-block">
        <div class="news-block__header">
            <h2 class="news-block__title">Latest News</h2>
            <div class="news-block__filters">
                <Button
                    variant="outline"
                    :class="{ 'news-block__filter--active': activeCategory === 'all' }"
                    @click="setCategory('all')"
                >
                    All
                </Button>
                <Button
                    v-for="cat in categories"
                    :key="cat"
                    variant="outline"
                    :class="{ 'news-block__filter--active': activeCategory === cat }"
                    @click="setCategory(cat)"
                >
                    {{ cat.toUpperCase() }}
                </Button>
            </div>
        </div>

        <div v-if="isDataLoading" class="news-block__loading">
            <Spinner size="lg" color="var(--color-accent)" />
        </div>

        <div v-else-if="displayNews.length > 0" class="news-block__grid">
            <RouterLink
                v-for="item in displayNews"
                :key="item._id || item.id || item.title"
                :to="{
                    name: 'news-details',
                    params: { id: item._id || item.id },
                    query: { category: item.category }
                }"
                class="news-block__card-link"
            >
                <NewsCard :news="item" />
            </RouterLink>
        </div>

        <div v-else class="news-block__empty">No news found for this category.</div>

        <div class="news-block__pagination">
            <Button
                variant="outline"
                :disabled="currentPage === 1"
                @click="currentPage--"
            >
                Previous
            </Button>
            <span class="news-block__page-info">Page {{ currentPage }}</span>
            <Button variant="outline" @click="currentPage++"> Next </Button>
        </div>
    </section>
</template>

<style scoped lang="scss">
.news-block {
    padding: 2rem 0;

    &__header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 2rem;
        flex-wrap: wrap;
        gap: 1rem;
    }

    &__title {
        font-size: clamp(1.8rem, 4vw, 2.5rem);
        font-weight: 800;
        color: white;
        margin: 0;
    }

    &__filters {
        display: flex;
        gap: 0.5rem;
        overflow-x: auto;
        padding-bottom: 0.5rem;
        scrollbar-width: none;

        &::-webkit-scrollbar {
            display: none;
        }
    }

    &__filter--active.base-button {
        background-color: var(--color-accent);
        color: white;
    }

    &__loading {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 400px;
    }

    &__grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 2rem;
        margin-bottom: 2rem;
    }

    &__card-link {
        text-decoration: none;
        color: inherit;
        display: block;
        height: 100%;
    }

    &__empty {
        text-align: center;
        padding: 4rem;
        font-size: 1.25rem;
        color: var(--color-text-muted);
        background: var(--color-surface);
        border-radius: 2em;
    }

    &__pagination {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 1.5rem;
        margin-top: 2rem;
    }

    &__page-info {
        font-weight: 700;
        color: var(--color-text);
    }
}

@media (max-width: 640px) {
    .news-block__header {
        flex-direction: column;
        align-items: flex-start;
    }
}
</style>
