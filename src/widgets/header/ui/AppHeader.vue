<script setup lang="ts">
import { computed, ref } from "vue";
import { RouterLink, useRoute } from "vue-router";
import { useCartStore } from "entities/cart";
import { useUserStore } from "entities/user";

const route = useRoute();
const cartStore = useCartStore();
const userStore = useUserStore();

const cartCount = computed(() => cartStore.totalItems);
const isAuth = computed(() => userStore.isAuthenticated);
const user = computed(() => userStore.currentUser);

const scrolled = ref(false);
const mobileMenuOpen = ref(false);
const profileMenuOpen = ref(false);

// Track scroll for glassmorphism header effect
if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
        scrolled.value = window.scrollY > 20;
    });
}

const navLinks = [
    { to: "/", label: "Home" },
    { to: "/games", label: "Games" },
    { to: "/consoles", label: "Consoles" },
    { to: "/accessories", label: "Accessories" },
    { to: "/news", label: "News" },
    { to: "/psn", label: "Network" },
];

const isActive = (to: string) => {
    if (to === "/") return route.path === "/";
    return route.path.startsWith(to);
};

const closeMobileMenu = () => {
    mobileMenuOpen.value = false;
};

const handleSignOut = async () => {
    profileMenuOpen.value = false;
    await userStore.signOut();
};
</script>

<template>
    <header
        id="app-header"
        class="header"
        :class="{ 'header--scrolled': scrolled }"
        role="banner"
    >
        <div class="header__inner container">
            <!-- Logo -->
            <RouterLink to="/" class="header__logo" aria-label="PS Store Home">
                <svg width="160" viewBox="0 0 320 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g transform="matrix(1.25,0,0,1.25,-12.5,-12.49)" fill="#f9f7f0">
                        <polygon points="49.99,20.38 46.03,27.25 53.97,27.25"/>
                        <path d="M49.99,36.69c7.38,0,13.36-5.97,13.36-13.34c0-7.38-5.98-13.36-13.36-13.36c-7.36,0-13.34,5.98-13.34,13.36C36.65,30.73,42.63,36.69,49.99,36.69z M43.62,27.72l5.57-9.66c0.33-0.58,1.28-0.58,1.62,0l5.57,9.66c0.17,0.28,0.17,0.63,0,0.93c-0.17,0.28-0.48,0.46-0.82,0.46H44.42c-0.32,0-0.63-0.19-0.8-0.46C43.45,28.35,43.45,28,43.62,27.72z"/>
                        <path d="M49.99,63.31c-7.36,0-13.34,5.97-13.34,13.34c0,7.38,5.98,13.36,13.34,13.36c7.38,0,13.36-5.98,13.36-13.36C63.35,69.27,57.37,63.31,49.99,63.31z"/>
                        <rect x="18.7" y="45.35" width="9.29" height="9.29"/>
                        <path d="M23.34,36.64C15.97,36.64,10,42.62,10,50c0,7.38,5.97,13.36,13.34,13.36c7.38,0,13.36-5.98,13.36-13.36C36.7,42.62,30.72,36.64,23.34,36.64z"/>
                        <circle cx="76.66" cy="50" r="4.65"/>
                        <path d="M76.66,36.64c-7.38,0-13.36,5.98-13.36,13.36c0,7.38,5.98,13.36,13.36,13.36C84.02,63.36,90,57.38,90,50C90,42.62,84.02,36.64,76.66,36.64z"/>
                    </g>
                    <text
                        x="118"
                        y="58"
                        font-family="Montserrat, sans-serif"
                        font-weight="700"
                        font-size="38"
                        fill="#f9f7f0"
                        letter-spacing="1"
                    >Rebirths</text>
                    <text
                        x="119"
                        y="80"
                        font-family="Montserrat, sans-serif"
                        font-weight="400"
                        font-size="13"
                        fill="rgba(249,247,240,0.65)"
                        letter-spacing="3"
                    >STORE</text>
                </svg>
            </RouterLink>

            <!-- Desktop Nav -->
            <nav class="header__nav" aria-label="Main navigation">
                <RouterLink
                    v-for="link in navLinks"
                    :key="link.to"
                    :to="link.to"
                    class="header__nav-link"
                    :class="{ 'header__nav-link--active': isActive(link.to) }"
                >
                    {{ link.label }}
                </RouterLink>
            </nav>

            <!-- Right actions -->
            <div class="header__actions">
                <!-- Cart -->
                <RouterLink to="/basket" class="header__cart" aria-label="Shopping cart">
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M21 9h-1.42l-3.712-6.496-1.736.992L17.277 9H6.723l3.146-5.504-1.737-.992L4.42 9H3a1.001 1.001 0 0 0-.965 1.263l2.799 10.264A2.005 2.005 0 0 0 6.764 22h10.473c.898 0 1.692-.605 1.93-1.475l2.799-10.263A.998.998 0 0 0 21 9zm-3.764 11H6.764L4.31 11h15.38l-2.454 9z"/>
                    </svg>
                    <span v-if="cartCount > 0" class="header__cart-badge" aria-live="polite">
                        {{ cartCount > 99 ? '99+' : cartCount }}
                    </span>
                </RouterLink>

                <!-- Auth: logged in -->
                <div v-if="isAuth" class="header__user">
                    <button
                        id="header-avatar-btn"
                        class="header__avatar"
                        :title="`${user?.userName}'s profile`"
                        aria-haspopup="true"
                        :aria-expanded="profileMenuOpen"
                        @click="profileMenuOpen = !profileMenuOpen"
                    >
                        <img v-if="user?.avatar" :src="user.avatar" :alt="user.userName" />
                        <span v-else class="header__avatar-fallback">
                            {{ user?.userName?.[0]?.toUpperCase() ?? 'U' }}
                        </span>
                    </button>

                    <Transition name="slide-up">
                        <div
                            v-if="profileMenuOpen"
                            id="header-profile-menu"
                            class="header__profile-menu"
                            role="menu"
                            @click="profileMenuOpen = false"
                        >
                            <RouterLink
                                to="/psn"
                                class="header__profile-menu-item"
                                role="menuitem"
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/></svg>
                                My Profile
                            </RouterLink>
                            <RouterLink
                                to="/authorization/account-setting"
                                class="header__profile-menu-item"
                                role="menuitem"
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/></svg>
                                Account Settings
                            </RouterLink>
                            <div class="header__profile-menu-divider" role="separator" />
                            <button
                                class="header__profile-menu-item header__profile-menu-item--danger"
                                role="menuitem"
                                @click="handleSignOut"
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/></svg>
                                Sign Out
                            </button>
                        </div>
                    </Transition>
                </div>

                <!-- Auth: guest -->
                <RouterLink
                    v-else
                    id="header-signin-btn"
                    to="/authorization"
                    class="header__signin-btn"
                >
                    Sign In
                </RouterLink>

                <!-- Burger -->
                <button
                    id="header-burger-btn"
                    class="header__burger"
                    :class="{ 'header__burger--open': mobileMenuOpen }"
                    aria-label="Toggle mobile menu"
                    :aria-expanded="mobileMenuOpen"
                    @click="mobileMenuOpen = !mobileMenuOpen"
                >
                    <span /><span /><span />
                </button>
            </div>
        </div>

        <!-- Mobile menu -->
        <Transition name="slide-up">
            <nav
                v-if="mobileMenuOpen"
                id="header-mobile-menu"
                class="header__mobile-menu"
                aria-label="Mobile navigation"
            >
                <RouterLink
                    v-for="link in navLinks"
                    :key="link.to"
                    :to="link.to"
                    class="header__mobile-link"
                    :class="{ 'header__mobile-link--active': isActive(link.to) }"
                    @click="closeMobileMenu"
                >
                    {{ link.label }}
                </RouterLink>
                <div class="header__mobile-divider" />
                <RouterLink
                    v-if="!isAuth"
                    to="/authorization"
                    class="header__mobile-link"
                    @click="closeMobileMenu"
                >
                    Sign In
                </RouterLink>
                <button
                    v-else
                    class="header__mobile-link header__mobile-link--danger"
                    @click="handleSignOut"
                >
                    Sign Out
                </button>
            </nav>
        </Transition>
    </header>
</template>

<style scoped lang="scss">
.header {
    position: fixed;
    inset: 0 0 auto 0;
    z-index: var(--z-header);
    height: var(--header-height);
    transition: background var(--transition-slow), box-shadow var(--transition-slow),
        border-radius var(--transition-slow);

    &--scrolled {
        background: rgba(7, 42, 64, 0.88);
        backdrop-filter: blur(20px) saturate(1.4);
        -webkit-backdrop-filter: blur(20px) saturate(1.4);
        box-shadow: 0 0 0 1px var(--color-border), var(--shadow-md);
        border-radius: 0 0 var(--radius-xl) var(--radius-xl);
    }

    &__inner {
        display: flex;
        align-items: center;
        height: 100%;
        gap: var(--space-6);
    }

    &__logo {
        flex-shrink: 0;
        display: flex;
        align-items: center;
        transition: opacity var(--transition-fast);
        &:hover { opacity: 0.85; }
    }

    &__nav {
        display: flex;
        align-items: center;
        gap: var(--space-1);
        margin-inline-start: auto;

        @media (max-width: 810px) { display: none; }
    }

    &__nav-link {
        position: relative;
        padding: var(--space-2) var(--space-4);
        border-radius: var(--radius-full);
        font-size: var(--text-sm);
        font-weight: var(--weight-medium);
        color: var(--color-text-muted);
        transition: color var(--transition-fast), background var(--transition-fast);
        white-space: nowrap;

        &::after {
            content: '';
            position: absolute;
            bottom: 4px;
            left: 50%;
            transform: translateX(-50%) scaleX(0);
            width: 16px;
            height: 2px;
            border-radius: var(--radius-full);
            background: var(--color-accent);
            transition: transform var(--transition-fast);
        }

        &:hover {
            color: var(--color-text);
            background: rgba(255,255,255,0.05);
        }

        &--active {
            color: var(--color-text);
            background: var(--color-accent-dim);
            &::after { transform: translateX(-50%) scaleX(1); }
        }
    }

    &__actions {
        display: flex;
        align-items: center;
        gap: var(--space-3);
        margin-inline-start: auto;

        @media (min-width: 811px) { margin-inline-start: 0; }
    }

    &__cart {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        border-radius: var(--radius-md);
        color: var(--color-text);
        transition: background var(--transition-fast), color var(--transition-fast);

        &:hover { background: var(--color-accent-dim); color: var(--color-accent); }

        &-badge {
            position: absolute;
            top: 2px;
            right: 2px;
            min-width: 18px;
            height: 18px;
            padding: 0 4px;
            border-radius: var(--radius-full);
            background: var(--color-accent);
            color: var(--color-bg);
            font-size: 10px;
            font-weight: var(--weight-bold);
            display: flex;
            align-items: center;
            justify-content: center;
            line-height: 1;
            box-shadow: 0 0 0 2px var(--color-bg);
        }
    }

    &__user { position: relative; }

    &__avatar {
        width: 38px;
        height: 38px;
        border-radius: var(--radius-full);
        overflow: hidden;
        border: 2px solid var(--color-accent);
        cursor: pointer;
        transition: box-shadow var(--transition-fast);
        padding: 0;

        img { width: 100%; height: 100%; object-fit: cover; }

        &:hover { box-shadow: var(--shadow-glow); }

        &-fallback {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            background: var(--gradient-brand);
            color: #fff;
            font-weight: var(--weight-bold);
            font-size: var(--text-sm);
        }
    }

    &__profile-menu {
        position: absolute;
        top: calc(100% + var(--space-2));
        right: 0;
        min-width: 200px;
        background: var(--color-surface);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-lg);
        overflow: hidden;
        box-shadow: var(--shadow-lg);
        z-index: var(--z-dropdown);

        &-item {
            display: flex;
            align-items: center;
            gap: var(--space-3);
            width: 100%;
            padding: var(--space-3) var(--space-4);
            font-size: var(--text-sm);
            color: var(--color-text-muted);
            cursor: pointer;
            text-align: left;
            transition: background var(--transition-fast), color var(--transition-fast);

            &:hover { background: rgba(255,255,255,0.06); color: var(--color-text); }
            &--danger:hover { color: var(--color-danger); background: rgba(255, 94, 94, 0.08); }
        }

        &-divider {
            height: 1px;
            background: var(--color-border);
            margin: var(--space-1) 0;
        }
    }

    &__signin-btn {
        padding: var(--space-2) var(--space-5);
        border-radius: var(--radius-full);
        background: var(--gradient-brand);
        color: white;
        font-size: var(--text-sm);
        font-weight: var(--weight-semibold);
        transition: opacity var(--transition-fast), box-shadow var(--transition-fast);

        &:hover { opacity: 0.9; box-shadow: var(--shadow-glow); }
    }

    &__burger {
        display: none;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 40px;
        height: 40px;
        border-radius: var(--radius-md);
        gap: 5px;
        cursor: pointer;
        transition: background var(--transition-fast);

        &:hover { background: rgba(255,255,255,0.08); }

        span {
            display: block;
            width: 20px;
            height: 2px;
            background: var(--color-text);
            border-radius: var(--radius-full);
            transition: transform var(--transition-normal), opacity var(--transition-fast);
        }

        &--open {
            span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
            span:nth-child(2) { opacity: 0; transform: scaleX(0); }
            span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }
        }

        @media (max-width: 810px) { display: flex; }
    }

    &__mobile-menu {
        position: fixed;
        inset: var(--header-height) 0 0 0;
        background: rgba(4, 28, 44, 0.97);
        backdrop-filter: blur(24px);
        -webkit-backdrop-filter: blur(24px);
        display: flex;
        flex-direction: column;
        padding: var(--space-6);
        gap: var(--space-2);
        z-index: var(--z-header);
    }

    &__mobile-link {
        padding: var(--space-4) var(--space-5);
        border-radius: var(--radius-md);
        font-size: var(--text-lg);
        font-weight: var(--weight-medium);
        color: var(--color-text-muted);
        transition: all var(--transition-fast);
        text-align: left;
        cursor: pointer;

        &:hover { background: rgba(255,255,255,0.06); color: var(--color-text); }

        &--active {
            background: var(--color-accent-dim);
            color: var(--color-accent);
        }

        &--danger { color: var(--color-danger); }
    }

    &__mobile-divider {
        height: 1px;
        background: var(--color-border);
        margin: var(--space-2) 0;
    }
}
</style>
