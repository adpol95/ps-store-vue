<script setup lang="ts">
import { useQuery } from "@tanstack/vue-query";
import { ArrowLeft, Calendar, User } from "lucide-vue-next";
import { useRoute, useRouter } from "vue-router";

import { MOCK_NEWS } from "@/entities/news";
import { getNewsById } from "@/entities/news/api/newsService";
import { MainLayout } from "@/shared/ui";
import { Button } from "@/shared/ui/button";
import { Spinner } from "@/shared/ui/spinner";
import { Header } from "@/widgets";

const route = useRoute();
const router = useRouter();
const newsId = route.params.id as string;
const category = (route.query.category as string) || "ps5";

const {
    data: news,
    isLoading,
    isError
} = useQuery({
    queryKey: ["news-detail", newsId, category],
    queryFn: async () => {
        try {
            return await getNewsById(newsId, category);
        } catch (e) {
            // Fallback to mocks for development/demo
            const mock = MOCK_NEWS.find((n) => (n._id || n.id) === newsId);
            if (mock) return mock;
            throw e;
        }
    }
});

const goBack = () => router.back();
</script>

<template>
    <MainLayout>
        <template #header>
            <Header />
        </template>

        <div class="news-details">
            <div class="container">
                <Button variant="ghost" class="news-details__back" @click="goBack">
                    <ArrowLeft :size="20" />
                    <span>Back to News</span>
                </Button>

                <div v-if="isLoading" class="news-details__loading">
                    <Spinner size="lg" color="var(--color-accent)" />
                </div>

                <div v-else-if="isError" class="news-details__error">
                    <h3>Failed to load news details.</h3>
                    <Button @click="goBack">Go Back</Button>
                </div>

                <article v-else-if="news" class="news-article">
                    <header class="news-article__header">
                        <div class="news-article__category">
                            {{ category.toUpperCase() }}
                        </div>
                        <h1 class="news-article__title">{{ news.title }}</h1>

                        <div class="news-article__meta">
                            <div
                                v-if="news.content?.authorName"
                                class="news-article__meta-item"
                            >
                                <User :size="16" />
                                <span>{{ news.content.authorName }}</span>
                            </div>
                            <div
                                v-if="news.content?.dataTime"
                                class="news-article__meta-item"
                            >
                                <Calendar :size="16" />
                                <span>{{ news.content.dataTime }}</span>
                            </div>
                        </div>
                    </header>

                    <div v-if="news.img" class="news-article__main-image">
                        <img :src="news.img" :alt="news.title" />
                    </div>

                    <div class="news-article__content">
                        <div v-if="news.content?.headerTitle" class="news-article__intro">
                            {{ news.content.headerTitle }}
                        </div>

                        <div class="news-article__body">
                            <template
                                v-for="(node, index) in news.content?.mainText"
                                :key="index"
                            >
                                <p v-if="node[0] === 'P'">{{ node[1] }}</p>
                                <h2 v-else-if="node[0] === 'H2'">{{ node[1] }}</h2>
                                <div
                                    v-else-if="node[0] === 'FIGURE'"
                                    class="news-article__figure"
                                >
                                    <!-- In legacy, figures usually contain images handled in mainImgs, 
                       but we'll render text if present -->
                                    <p v-if="node[1]">{{ node[1] }}</p>
                                </div>
                                <div
                                    v-else-if="node[0] === 'DIV'"
                                    class="news-article__div"
                                >
                                    {{ node[1] }}
                                </div>
                            </template>
                        </div>

                        <div
                            v-if="
                                news.content?.mainImgs && news.content.mainImgs.length > 0
                            "
                            class="news-article__gallery"
                        >
                            <img
                                v-for="(img, idx) in news.content.mainImgs"
                                :key="idx"
                                :src="img"
                                alt="Article image"
                            />
                        </div>

                        <footer
                            v-if="news.content?.authorDescription"
                            class="news-article__author-bio"
                        >
                            <div class="news-article__author-bio-header">
                                <User :size="24" />
                                <h4>About the Author</h4>
                            </div>
                            <p>{{ news.content.authorDescription }}</p>
                        </footer>
                    </div>
                </article>
            </div>
        </div>
    </MainLayout>
</template>

<style scoped lang="scss">
.news-details {
    padding: 2rem 0 5rem;
    color: white;

    &__back {
        margin-bottom: 2rem;
        color: var(--color-text-muted);
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0;

        &:hover {
            color: white;
            background: transparent;
        }
    }

    &__loading,
    &__error {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        min-height: 400px;
        gap: 1.5rem;
    }
}

.news-article {
    max-width: 800px;
    margin: 0 auto;

    &__header {
        margin-bottom: 2.5rem;
        text-align: center;
    }

    &__category {
        color: var(--color-accent);
        font-weight: 800;
        letter-spacing: 0.2em;
        margin-bottom: 1rem;
        font-size: 0.9rem;
    }

    &__title {
        font-size: clamp(2rem, 5vw, 3.5rem);
        line-height: 1.1;
        font-weight: 800;
        margin-bottom: 1.5rem;
    }

    &__meta {
        display: flex;
        justify-content: center;
        gap: 2rem;
        color: var(--color-text-muted);
        font-size: 0.95rem;

        &-item {
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
    }

    &__main-image {
        margin-bottom: 3rem;
        border-radius: 2em;
        overflow: hidden;
        box-shadow: var(--shadow-soft);

        img {
            width: 100%;
            height: auto;
            display: block;
        }
    }

    &__content {
        font-size: 1.15rem;
        line-height: 1.6;
        color: var(--color-text);
    }

    &__intro {
        font-size: 1.4rem;
        font-weight: 600;
        margin-bottom: 2.5rem;
        color: white;
        line-height: 1.4;
        border-left: 4px solid var(--color-accent);
        padding-left: 1.5rem;
    }

    &__body {
        p {
            margin-bottom: 1.5rem;
        }

        h2 {
            font-size: 1.8rem;
            font-weight: 700;
            margin: 2.5rem 0 1.25rem;
            color: white;
        }
    }

    &__gallery {
        display: grid;
        grid-template-columns: 1fr;
        gap: 2rem;
        margin: 3rem 0;

        img {
            width: 100%;
            border-radius: 1.5em;
            box-shadow: var(--shadow-soft);
        }
    }

    &__author-bio {
        margin-top: 4rem;
        padding: 2rem;
        background: var(--color-surface);
        border-radius: 1.5em;
        border: 1px solid var(--color-border);

        &-header {
            display: flex;
            align-items: center;
            gap: 1rem;
            margin-bottom: 1rem;
            color: white;

            h4 {
                margin: 0;
                font-size: 1.2rem;
            }
        }

        p {
            margin: 0;
            font-size: 1rem;
            color: var(--color-text-muted);
        }
    }
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
}
</style>
