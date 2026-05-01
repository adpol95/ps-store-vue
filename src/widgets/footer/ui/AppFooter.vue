<script setup lang="ts">
import { RouterLink } from "vue-router";

const navLinks = [
    { to: "/", label: "Home" },
    { to: "/games", label: "Games" },
    { to: "/consoles", label: "Consoles" },
    { to: "/accessories", label: "Accessories" },
    { to: "/news", label: "News" },
    { to: "/psn", label: "Network" },
];
</script>

<template>
    <footer class="footer" role="contentinfo">
        <div class="footer__inner container">
            <div class="footer__brand">
                <RouterLink to="/" aria-label="PS Store Home" class="footer__logo-link">
                    <span class="footer__logo-text">PS<span class="footer__logo-accent">Rebirths</span></span>
                </RouterLink>
                <p class="footer__tagline">Your ultimate PlayStation destination.</p>
            </div>

            <nav class="footer__nav" aria-label="Footer navigation">
                <h3 class="footer__nav-title">Catalog</h3>
                <RouterLink to="/games" class="footer__nav-link">Games</RouterLink>
                <RouterLink to="/consoles" class="footer__nav-link">Consoles</RouterLink>
                <RouterLink to="/accessories" class="footer__nav-link">Accessories</RouterLink>
                <RouterLink to="/news" class="footer__nav-link">News</RouterLink>
            </nav>

            <nav class="footer__nav" aria-label="Account navigation">
                <h3 class="footer__nav-title">Account</h3>
                <RouterLink to="/psn" class="footer__nav-link">PSN Network</RouterLink>
                <RouterLink to="/authorization" class="footer__nav-link">Sign In</RouterLink>
                <RouterLink to="/authorization/registration" class="footer__nav-link">Register</RouterLink>
                <RouterLink to="/basket" class="footer__nav-link">Basket</RouterLink>
            </nav>

            <div class="footer__brand-icons">
                <h3 class="footer__nav-title">Platforms</h3>
                <div class="footer__platforms">
                    <span class="footer__platform">PS5</span>
                    <span class="footer__platform">PS4</span>
                    <span class="footer__platform">PS VR2</span>
                </div>
            </div>
        </div>

        <div class="footer__bottom">
            <div class="container footer__bottom-inner">
                <p class="footer__copy">
                    &copy; {{ new Date().getFullYear() }} PS Rebirths Store. Fan project, not affiliated with Sony.
                </p>
                <div class="footer__bottom-links">
                    <RouterLink to="/" class="footer__bottom-link">Privacy</RouterLink>
                    <RouterLink to="/" class="footer__bottom-link">Terms</RouterLink>
                </div>
            </div>
        </div>
    </footer>
</template>

<style scoped lang="scss">
.footer {
    background: var(--color-bg-deep);
    border-top: 1px solid var(--color-border);
    margin-top: auto;

    &__inner {
        display: grid;
        grid-template-columns: 2fr 1fr 1fr 1fr;
        gap: var(--space-10);
        padding-block: var(--space-12);

        @media (max-width: 900px) {
            grid-template-columns: 1fr 1fr;
        }
        @media (max-width: 580px) {
            grid-template-columns: 1fr;
            gap: var(--space-8);
        }
    }

    &__brand { display: flex; flex-direction: column; gap: var(--space-3); }

    &__logo-link { display: inline-block; }

    &__logo-text {
        font-size: var(--text-xl);
        font-weight: var(--weight-bold);
        color: var(--color-text);
        letter-spacing: 0.5px;
    }

    &__logo-accent { color: var(--color-accent); margin-left: 4px; }

    &__tagline {
        font-size: var(--text-sm);
        color: var(--color-text-muted);
        line-height: var(--leading-loose);
        max-width: 240px;
    }

    &__nav {
        display: flex;
        flex-direction: column;
        gap: var(--space-3);
    }

    &__nav-title {
        font-size: var(--text-xs);
        font-weight: var(--weight-bold);
        text-transform: uppercase;
        letter-spacing: 1.5px;
        color: var(--color-text-muted);
        margin-bottom: var(--space-1);
    }

    &__nav-link {
        font-size: var(--text-sm);
        color: var(--color-text-muted);
        transition: color var(--transition-fast);
        &:hover { color: var(--color-accent); }
    }

    &__platforms {
        display: flex;
        flex-wrap: wrap;
        gap: var(--space-2);
        margin-top: var(--space-1);
    }

    &__platform {
        padding: var(--space-1) var(--space-3);
        border-radius: var(--radius-full);
        border: 1px solid var(--color-border);
        font-size: var(--text-xs);
        font-weight: var(--weight-semibold);
        color: var(--color-text-muted);
    }

    &__bottom {
        border-top: 1px solid var(--color-border);
        padding-block: var(--space-4);
    }

    &__bottom-inner {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: var(--space-4);

        @media (max-width: 580px) { flex-direction: column; align-items: flex-start; }
    }

    &__copy {
        font-size: var(--text-xs);
        color: var(--color-text-muted);
    }

    &__bottom-links {
        display: flex;
        gap: var(--space-5);
    }

    &__bottom-link {
        font-size: var(--text-xs);
        color: var(--color-text-muted);
        transition: color var(--transition-fast);
        &:hover { color: var(--color-text); }
    }
}
</style>
