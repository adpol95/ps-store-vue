<script setup lang="ts">
import { Cloud, Coins, Filter, Network } from "@lucide/vue";

import { MOCK_PRODUCTS } from "@/entities/product";
import { MainLayout } from "@/shared/ui";
import { Header, NewsBlock, ProductGrid } from "@/widgets";
</script>

<template>
    <MainLayout class="layout-override">
        <template #header>
            <Header />
        </template>

        <div class="home-page">
            <section class="home-page__top-section">
                <div class="welcome-container">
                    <div class="welcome-text">
                        <div class="welcome-text__greet">WELCOME TO PS STORE</div>
                        <div class="welcome-text__slogan">
                            PUSH GAMES THROUGH YOUR VEINS
                        </div>
                        <div class="welcome-text__description">
                            Enjoy hundreds of high-quality games, consoles, accessories
                            and interactive network system in our app.
                        </div>
                    </div>
                    <div class="welcome-img">
                        <div class="welcome-img__price">4999 ₽</div>
                        <img
                            src="https://image.api.playstation.com/vulcan/ap/rnd/202512/1205/79661d7a2bdb9784749b4e57e1456ca89f7ac7bed8615aee.png?w=620&thumb=false"
                            alt="Resident Evil 9"
                        />
                    </div>
                </div>

                <div class="bottom-categories">
                    <div class="row-list__container">
                        <div class="bottom-categories__logo">
                            <Cloud color="var(--color-white)" :size="24" />
                        </div>
                        <div class="bottom-categories__text">CLOUD STORAGE</div>
                    </div>
                    <div class="row-list__container">
                        <div class="bottom-categories__logo">
                            <Network color="var(--color-white)" :size="24" />
                        </div>
                        <div class="bottom-categories__text">INTERACTIVE NETWORK</div>
                    </div>
                    <div class="row-list__container">
                        <div class="bottom-categories__logo">
                            <Coins color="var(--color-white)" :size="24" />
                        </div>
                        <div class="bottom-categories__text">EARN MONEY IN PLAY</div>
                    </div>
                    <div class="row-list__container">
                        <div class="bottom-categories__logo">
                            <Filter color="var(--color-white)" :size="24" />
                        </div>
                        <div class="bottom-categories__text">BROWSE GAMES BY FILTER</div>
                    </div>
                </div>
            </section>

            <section class="home-page__products">
                <div class="home-page__section-header">
                    <div class="top-name-description">
                        <h4>TRENDING</h4>
                        <h3>Most selling games</h3>
                    </div>
                    <RouterLink to="/games" class="home-page__view-all focus-btn">
                        View all
                    </RouterLink>
                </div>
                <ProductGrid :products="MOCK_PRODUCTS" />
            </section>

            <section class="home-page__news">
                <div class="container">
                    <NewsBlock />
                </div>
            </section>

            <section class="home-page__bottom-section">
                <div class="bottom-section__block">
                    <div class="top-name-description">
                        <h4>Consoles</h4>
                        <h3><span>PLAY</span> LIKE NEVER BEFORE</h3>
                    </div>
                    <h4 class="bottom-section__description">
                        Experience lightning-fast loading with an ultra-high speed SSD,
                        deeper immersion with support for haptic feedback, adaptive
                        triggers and 3D Audio, and an all-new generation of incredible
                        PlayStation games.
                    </h4>
                    <RouterLink to="/consoles">
                        <button class="focus-btn category-btn__active">Shop now</button>
                    </RouterLink>
                </div>
                <div class="bottom-section__block">
                    <div class="top-name-description">
                        <h4>Accessories</h4>
                        <h3>
                            Build your perfect gaming setup with
                            <span>controllers, headsets and other</span>
                        </h3>
                    </div>
                    <RouterLink to="/accessories">
                        <button class="focus-btn category-btn__active">Shop now</button>
                    </RouterLink>
                </div>
            </section>
        </div>

        <template #footer>
            <div class="footer-placeholder">
                <div class="footer-placeholder__content">
                    <p>&copy; 2026 PS Store Clone. Все права защищены.</p>
                </div>
            </div>
        </template>
    </MainLayout>
</template>

<style scoped lang="scss">
/* Override global layout constraints for the full-width legacy hero */
:deep(.main-layout__content) {
    max-width: 100% !important;
    padding: 0 !important;
}

.home-page {
    display: flex;
    flex-direction: column;
    padding-bottom: 5em;

    &__top-section {
        background: linear-gradient(
            135deg,
            var(--color-bg) 0%,
            var(--color-surface) 100%
        );
        height: auto;
        min-height: 33em;
        border-bottom-left-radius: 10vw;
        border-bottom-right-radius: 10vw;
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 6rem 10% 14rem 10%;
        margin-bottom: 4rem;

        @media (max-width: 1024px) {
            padding-top: 4rem;
            padding-bottom: 16rem;
        }

        @media (max-width: 768px) {
            border-bottom-left-radius: 3rem;
            border-bottom-right-radius: 3rem;
            padding: 2rem 1rem 4rem 1rem;
            margin-bottom: 0;
            min-height: auto;
        }
    }
}

.welcome-container {
    display: flex;
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    gap: 2rem;

    @media (max-width: 992px) {
        align-items: center;
    }

    @media (max-width: 768px) {
        flex-direction: column;
        text-align: center;
        gap: 1.5rem;
    }
}

.welcome-text {
    flex: 1.2;
    display: flex;
    flex-direction: column;
    justify-content: center;

    &__greet {
        font-size: clamp(1rem, 2vw, 1.3rem);
        font-weight: 500;
        color: var(--color-text);
        letter-spacing: 1px;
    }

    &__slogan {
        padding: 0.3em 0 0.5em 0;
        font-size: clamp(2.2rem, 8vw, 3.5rem);
        font-weight: 800;
        line-height: 1.1;
        color: white;

        @media (max-width: 768px) {
            padding: 0.2em 0;
        }
    }

    &__description {
        font-weight: 400;
        font-size: clamp(0.95rem, 1.5vw, 1.1rem);
        color: var(--color-text-muted);
        max-width: 90%;
        line-height: 1.5;

        @media (max-width: 768px) {
            max-width: 100%;
            padding: 0 0.5rem;
        }
    }
}

.welcome-img {
    display: flex;
    align-items: start;
    justify-content: flex-end;
    flex: 0.8;
    position: relative;

    @media (max-width: 992px) {
        img {
            width: 100%;
            height: auto;
            max-width: 24rem;
        }
    }

    @media (max-width: 768px) {
        display: none;
    }

    img {
        width: 28em;
        height: 29em;
        object-fit: cover;
        object-position: center;
        border-radius: 2rem;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
    }

    &__price {
        position: absolute;
        top: 1rem;
        right: 1.5rem;
        font-weight: 600;
        background: var(--color-accent);
        padding: 0.8rem 1.2rem;
        border-radius: 1.5rem;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
        color: white;
        z-index: 2;
    }
}

.bottom-categories {
    display: flex;
    position: absolute;
    bottom: -3rem;
    width: 100%;
    max-width: 1200px;
    column-gap: 1.5rem;
    row-gap: 1rem;
    padding: 0 2rem;
    box-sizing: border-box;

    @media (max-width: 1100px) {
        display: grid;
        grid-template-columns: 1fr 1fr;
        bottom: -6rem;
    }

    @media (max-width: 768px) {
        position: relative;
        bottom: auto;
        display: flex;
        flex-direction: column;
        padding: 2rem 1rem 0;
        margin-top: 0;
        gap: 1rem;
    }

    .row-list__container {
        padding: 1.2rem 1.5rem;
        background: var(--color-white);
        color: var(--color-bg);
        font-weight: 700;
        font-size: 1rem;
        border-radius: 1.2rem;
        display: flex;
        align-items: center;
        gap: 1rem;
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
        transition: all 0.2s ease;

        @media (max-width: 768px) {
            width: 100%;
            box-sizing: border-box;
        }

        &:hover {
            transform: translateY(-5px);
            background: #ffffff;
            box-shadow: 0 12px 30px rgba(0, 0, 0, 0.25);
        }

        .bottom-categories__logo {
            display: flex;
            background: var(--color-accent);
            padding: 0.8rem;
            border-radius: 1.2rem;
            transition: background 0.3s;
            flex-shrink: 0;

            :deep(svg) {
                width: 24px;
                height: 24px;
            }
        }

        &:hover .bottom-categories__logo {
            background: var(--color-bg);
        }

        .bottom-categories__text {
            line-height: 1.2;
        }
    }
}

.home-page__products,
.home-page__news {
    max-width: 1200px;
    margin: 0 auto;
    width: 100%;
    padding: 4em 2rem;
    box-sizing: border-box;

    .home-page__section-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 3rem;

        @media (max-width: 600px) {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
        }
    }
}

.top-name-description {
    h4 {
        color: var(--color-accent);
        font-size: 1.2em;
        margin: 0 0 0.2em 0;
        text-transform: uppercase;
        letter-spacing: 2px;

        @media (max-width: 600px) {
            font-size: 1rem;
        }
    }

    h3 {
        font-size: clamp(1.8rem, 4vw, 2.5rem);
        color: white;
        margin: 0;
        line-height: 1.2;

        span {
            color: var(--color-accent);
        }
    }
}

.focus-btn {
    text-decoration: none;
    color: var(--color-text);
    background: var(--color-surface);
    padding: 0.8em 1.5em;
    border-radius: 2em;
    font-weight: 600;
    transition:
        background 0.3s,
        transform 0.2s;
    border: none;
    cursor: pointer;
    font-size: 1em;

    &:hover {
        background: var(--color-accent);
        transform: translateY(-2px);
    }

    @media (max-width: 600px) {
        width: 100%;
        text-align: center;
    }
}

.home-page__bottom-section {
    display: flex;
    max-width: 1200px;
    margin: 0 auto;
    width: 100%;
    padding: 2em 2rem 5em;
    gap: 3em;
    box-sizing: border-box;

    @media (max-width: 810px) {
        flex-direction: column;
        gap: 2rem;
    }

    .bottom-section__block {
        flex: 1;
        background: #f8fafc;
        border-radius: 2em;
        padding: clamp(1.5rem, 5vw, 3rem);
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.04);
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 1.5em;
        border: 1px solid rgba(0, 0, 0, 0.03);

        .top-name-description {
            h4 {
                color: var(--color-bg);
            }
            h3 {
                color: #1e293b;
                font-size: clamp(1.5rem, 3vw, 2rem);
            }
        }

        .bottom-section__description {
            color: #64748b;
            font-weight: 500;
            margin: 0;
            line-height: 1.5;
            font-size: 0.95rem;
        }

        .focus-btn {
            background: var(--color-bg);
            color: white;

            &:hover {
                background: var(--color-accent);
            }

            @media (max-width: 600px) {
                width: auto;
            }
        }
    }
}

.footer-placeholder {
    border-top: 1px solid var(--color-border);
    padding: 2rem 0;
    margin-top: 2rem;

    &__content {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 2rem;
        text-align: center;
        color: var(--color-text-muted);
        font-size: 0.9rem;
    }
}
</style>
