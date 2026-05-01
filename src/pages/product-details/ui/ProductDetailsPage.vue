<script setup lang="ts">
import { computed } from "vue";
import { Heart, ShoppingCart, Star } from "lucide-vue-next";
import { useRoute } from "vue-router";

import { useCartStore } from "@/entities/cart";
import { MOCK_PRODUCTS } from "@/entities/product";
import { MainLayout } from "@/shared/ui";
import { Header } from "@/widgets";

const route = useRoute();
const cartStore = useCartStore();
const productId = computed(() => route.params.id as string);

const product = computed(
    () => MOCK_PRODUCTS.find((p) => p._id === productId.value) || MOCK_PRODUCTS[0]
);

const handleAddToCart = () => {
    cartStore.addToCart(product.value);
};
</script>

<template>
    <MainLayout>
        <template #header>
            <Header />
        </template>

        <div class="product-details">
            <section
                class="product-details__hero"
                :style="{ backgroundImage: `url(${product.backgroundImg})` }"
            >
                <div class="hero-overlay"></div>
                <div class="hero-content">
                    <h1 class="hero-title">{{ product.title }}</h1>
                </div>
            </section>

            <div class="product-details__container">
                <div class="product-info-grid">
                    <div class="product-info-grid__left">
                        <div class="product-cover">
                            <img :src="product.img" :alt="product.title" />
                            <div class="product-platform-badge">
                                {{ product.platform }}
                            </div>
                        </div>
                    </div>

                    <div class="product-info-grid__right">
                        <div class="product-meta">
                            <span class="product-developer">{{ product.developer }}</span>
                            <h1 class="product-title">{{ product.title }}</h1>
                            <div class="product-price">{{ product.price }}</div>

                            <div class="product-rating">
                                <Star class="star-icon" :size="20" fill="currentColor" />
                                <span
                                    >Rating:
                                    <strong>{{ product.rating }} / 5</strong></span
                                >
                            </div>

                            <div class="product-compatibility">
                                <ul>
                                    <li v-for="item in product.compatibility" :key="item">
                                        {{ item }}
                                    </li>
                                </ul>
                            </div>

                            <div class="product-actions">
                                <button class="btn-primary" @click="handleAddToCart">
                                    <ShoppingCart :size="20" />
                                    Add to Cart
                                </button>
                                <button class="btn-icon-favorite">
                                    <Heart :size="24" />
                                </button>
                            </div>

                            <div class="product-meta-footer">
                                <div class="product-additional-info">
                                    <table>
                                        <tr
                                            v-for="info in product.gameInfo"
                                            :key="info.label"
                                        >
                                            <th>{{ info.label }}</th>
                                            <td>{{ info.value }}</td>
                                        </tr>
                                    </table>
                                </div>
                                <div class="product-age-rating">
                                    <img :src="product.age.ratingImg" alt="Age Rating" />
                                    <div class="age-description">
                                        <div
                                            v-for="desc in product.age.descriptors"
                                            :key="desc"
                                            class="age-desc-item"
                                        >
                                            {{ desc }}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </MainLayout>
</template>

<style scoped lang="scss">
.product-details {
    color: var(--color-text);
    padding-bottom: 5rem;

    &__hero {
        height: 40vh;
        min-height: 300px;
        background-size: cover;
        background-position: center;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: -5rem;
        border-bottom-left-radius: 5vw;
        border-bottom-right-radius: 5vw;
        overflow: hidden;

        .hero-overlay {
            position: absolute;
            inset: 0;
            background: linear-gradient(to bottom, rgba(7, 42, 64, 0.4), var(--color-bg));
        }

        .hero-content {
            position: relative;
            z-index: 1;
            text-align: center;

            .hero-title {
                font-size: clamp(2rem, 5vw, 4rem);
                font-weight: 800;
                color: white;
                text-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
                margin: 0;
            }
        }
    }

    &__container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 2rem;
        position: relative;
        z-index: 2;
    }
}

.product-info-grid {
    display: grid;
    grid-template-columns: 350px 1fr;
    gap: 3rem;
    align-items: start;

    @media (max-width: 992px) {
        grid-template-columns: 1fr;
        gap: 2rem;
    }

    &__left {
        .product-cover {
            position: relative;
            border-radius: 2rem;
            overflow: hidden;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
            aspect-ratio: 1 / 1.2;

            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }

            .product-platform-badge {
                position: absolute;
                top: 1rem;
                left: 1rem;
                background: var(--color-bg);
                color: white;
                padding: 0.5rem 1rem;
                border-radius: 1rem;
                font-weight: 700;
                font-size: 0.9rem;
            }
        }
    }
}

.product-meta {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;

    .product-developer {
        color: var(--color-accent);
        font-weight: 600;
        font-size: 1.1rem;
        text-transform: uppercase;
        letter-spacing: 1px;
    }

    .product-title {
        font-size: clamp(2rem, 4vw, 3rem);
        margin: 0;
        line-height: 1.1;
    }

    .product-price {
        font-size: 2rem;
        font-weight: 800;
        color: white;
    }

    .product-rating {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        color: #ffcc00;

        span {
            color: var(--color-text);
            font-size: 1.1rem;
        }
    }

    .product-compatibility {
        ul {
            list-style: none;
            padding: 0;
            display: flex;
            gap: 1rem;

            li {
                background: var(--color-surface);
                padding: 0.4rem 1rem;
                border-radius: 2rem;
                font-size: 0.9rem;
                font-weight: 600;
            }
        }
    }
}

.product-actions {
    display: flex;
    gap: 1.5rem;
    align-items: center;

    .btn-primary {
        background: var(--color-accent);
        color: white;
        border: none;
        padding: 1rem 2.5rem;
        border-radius: 2rem;
        font-weight: 700;
        font-size: 1.1rem;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 0.75rem;
        transition: all 0.3s ease;

        &:hover {
            background: color-mix(in srgb, var(--color-accent) 80%, white);
            transform: translateY(-2px);
        }
    }

    .btn-icon-favorite {
        background: var(--color-surface);
        color: var(--color-text);
        border: none;
        width: 3.5rem;
        height: 3.5rem;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.3s ease;

        &:hover {
            background: #ff4081;
            color: white;
            transform: scale(1.1);
        }
    }
}

.product-meta-footer {
    display: flex;
    justify-content: space-between;
    gap: 2rem;
    padding-top: 2rem;
    border-top: 1px solid var(--color-border);

    @media (max-width: 600px) {
        flex-direction: column;
    }
}

.product-additional-info {
    flex: 1;
    table {
        width: 100%;
        border-collapse: collapse;

        tr {
            border-bottom: 1px solid rgba(255, 255, 255, 0.05);

            th {
                text-align: left;
                padding: 0.75rem 0;
                color: var(--color-text-muted);
                font-weight: 500;
            }

            td {
                text-align: right;
                padding: 0.75rem 0;
                font-weight: 600;
            }
        }
    }
}

.product-age-rating {
    display: flex;
    gap: 1rem;
    align-items: center;
    max-width: 350px;

    img {
        height: 4.5rem;
        flex-shrink: 0;
    }

    .age-description {
        display: flex;
        flex-direction: column;
        gap: 0.2rem;

        .age-desc-item {
            font-size: 0.85rem;
            font-weight: 600;
            color: var(--color-text-muted);
            line-height: 1.2;
        }
    }
}
</style>
