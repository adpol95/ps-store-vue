<script setup lang="ts">
import { computed, ref } from "vue";
import { Search, SlidersHorizontal } from "lucide-vue-next";
import { useRoute } from "vue-router";

import { MOCK_PRODUCTS } from "@/entities/product";
import { MainLayout } from "@/shared/ui";
import { Header, ProductGrid } from "@/widgets";

const route = useRoute();
const searchQuery = ref("");
const selectedGenre = ref("All");

const pageTitle = computed(() => {
    if (route.name === "consoles") return "CONSOLES CATALOG";
    if (route.name === "accessories") return "ACCESSORIES CATALOG";
    return "GAMES CATALOG";
});

const genres = computed(() => {
    const allGenres = MOCK_PRODUCTS.map((p) => p.genre);
    return ["All", ...new Set(allGenres)];
});

const filteredProducts = computed(() => {
    return MOCK_PRODUCTS.filter((product) => {
        const matchesSearch = product.title
            .toLowerCase()
            .includes(searchQuery.value.toLowerCase());
        const matchesGenre =
            selectedGenre.value === "All" || product.genre === selectedGenre.value;
        return matchesSearch && matchesGenre;
    });
});
</script>

<template>
    <MainLayout>
        <template #header>
            <Header />
        </template>

        <div class="products-page">
            <section class="products-page__hero">
                <div class="hero-content">
                    <h1>{{ pageTitle }}</h1>
                    <div class="search-bar">
                        <label for="search-input" class="search-label">
                            <span class="visually-hidden">Search products</span>
                            <Search class="search-icon" :size="20" aria-hidden="true" />
                            <input
                                id="search-input"
                                v-model="searchQuery"
                                type="text"
                                placeholder="Search for your next adventure..."
                            />
                        </label>
                    </div>
                </div>
            </section>

            <div class="products-page__container">
                <div class="catalog-layout">
                    <aside class="catalog-sidebar">
                        <div class="filter-group">
                            <div class="filter-header">
                                <SlidersHorizontal :size="18" />
                                <h3>Filters</h3>
                            </div>

                            <div class="filter-section">
                                <h4>Genres</h4>
                                <div class="genre-list">
                                    <button
                                        v-for="genre in genres"
                                        :key="genre"
                                        type="button"
                                        class="filter-chip"
                                        :class="{ active: selectedGenre === genre }"
                                        @click="selectedGenre = genre"
                                    >
                                        {{ genre }}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </aside>

                    <main class="catalog-main">
                        <div class="results-header">
                            <span>
                                Found
                                <strong>{{ filteredProducts.length }}</strong> products
                            </span>
                        </div>

                        <div
                            v-if="filteredProducts.length > 0"
                            class="products-grid-wrapper"
                        >
                            <ProductGrid :products="filteredProducts" />
                        </div>

                        <div v-else class="no-results">
                            <p>No products found matching your criteria.</p>
                            <button
                                type="button"
                                class="btn-reset"
                                @click="
                                    searchQuery = '';
                                    selectedGenre = 'All';
                                "
                            >
                                Reset Filters
                            </button>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    </MainLayout>
</template>

<style scoped lang="scss">
.products-page {
    &__hero {
        background: linear-gradient(to bottom, var(--color-bg), var(--color-surface));
        padding: 6rem 2rem 10rem;
        text-align: center;
        border-bottom-left-radius: 10vw;
        border-bottom-right-radius: 10vw;
        margin-bottom: -4rem;

        h1 {
            font-size: clamp(2.5rem, 6vw, 4rem);
            font-weight: 800;
            color: white;
            margin-bottom: 2rem;
        }

        .search-bar {
            max-width: 600px;
            margin: 0 auto;
            position: relative;

            .search-icon {
                position: absolute;
                left: 1.5rem;
                top: 50%;
                transform: translateY(-50%);
                color: var(--color-text-muted);
            }

            input {
                width: 100%;
                background: var(--color-bg);
                border: 2px solid var(--color-border);
                border-radius: 3rem;
                padding: 1.2rem 1.5rem 1.2rem 3.5rem;
                color: white;
                font-size: 1.1rem;
                transition: all 0.3s ease;

                &:focus {
                    border-color: var(--color-accent);
                    outline: none;
                    box-shadow: 0 0 20px rgba(23, 140, 164, 0.2);
                }
            }
        }
    }

    &__container {
        max-width: 1400px;
        margin: 0 auto;
        padding: 0 2rem 5rem;
    }
}

.catalog-layout {
    display: grid;
    grid-template-columns: 280px 1fr;
    gap: 3rem;

    @media (max-width: 992px) {
        grid-template-columns: 1fr;
    }
}

.catalog-sidebar {
    .filter-group {
        background: var(--color-surface);
        padding: 2rem;
        border-radius: 2rem;
        position: sticky;
        top: 6rem;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);

        .filter-header {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            margin-bottom: 2rem;
            color: var(--color-accent);

            h3 {
                margin: 0;
                font-size: 1.3rem;
            }
        }

        .filter-section {
            h4 {
                font-size: 1rem;
                margin-bottom: 1rem;
                color: white;
                text-transform: uppercase;
                letter-spacing: 1px;
            }

            .genre-list {
                display: flex;
                flex-direction: column;
                gap: 0.5rem;

                @media (max-width: 992px) {
                    flex-direction: row;
                    overflow-x: auto;
                    padding-bottom: 1rem;
                    mask-image: linear-gradient(to right, black 80%, transparent 100%);
                    scrollbar-width: none;
                    &::-webkit-scrollbar {
                        display: none;
                    }
                }
            }
        }
    }
}

.filter-chip {
    background: transparent;
    border: 1px solid var(--color-border);
    color: var(--color-text-muted);
    padding: 0.75rem 1.25rem;
    border-radius: 1rem;
    text-align: left;
    cursor: pointer;
    font-weight: 500;
    transition: all 0.2s ease;
    white-space: nowrap;

    &:hover {
        background: rgba(255, 255, 255, 0.05);
        color: white;
    }

    &.active {
        background: var(--color-accent);
        border-color: var(--color-accent);
        color: white;
    }
}

.results-header {
    margin-bottom: 2rem;
    color: var(--color-text-muted);

    strong {
        color: white;
    }
}

.no-results {
    text-align: center;
    padding: 5rem 0;

    p {
        font-size: 1.2rem;
        color: var(--color-text-muted);
        margin-bottom: 1.5rem;
    }

    .btn-reset {
        background: var(--color-accent);
        color: white;
        border: none;
        padding: 0.8rem 2rem;
        border-radius: 2rem;
        font-weight: 600;
        cursor: pointer;
    }
}
</style>
