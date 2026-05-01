import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";

import { useSessionStore } from "@/entities/session";
import HomePage from "@/pages/home/ui/HomePage.vue";

const routes: RouteRecordRaw[] = [
    {
        path: "/",
        name: "home",
        component: HomePage
    },
    {
        path: "/login",
        name: "login",
        component: () => import("@/pages/login/ui/LoginPage.vue")
    },
    {
        path: "/games",
        name: "games",
        component: () => import("@/pages/products/ui/ProductsPage.vue")
    },
    {
        path: "/games/:id",
        name: "game-details",
        component: () => import("@/pages/product-details/ui/ProductDetailsPage.vue")
    },
    {
        path: "/consoles",
        name: "consoles",
        component: () => import("@/pages/products/ui/ProductsPage.vue")
    },
    {
        path: "/consoles/:id",
        name: "console-details",
        component: () => import("@/pages/product-details/ui/ProductDetailsPage.vue")
    },
    {
        path: "/accessories",
        name: "accessories",
        component: () => import("@/pages/products/ui/ProductsPage.vue")
    },
    {
        path: "/accessories/:id",
        name: "accessory-details",
        component: () => import("@/pages/product-details/ui/ProductDetailsPage.vue")
    },
    {
        path: "/news",
        name: "news",
        component: HomePage
    },
    {
        path: "/news/:id",
        name: "news-details",
        component: () => import("@/pages/news-details/ui/NewsDetailsPage.vue")
    },
    {
        path: "/authorization",
        children: [
            {
                path: "",
                name: "login-alt",
                component: () => import("@/pages/login/ui/LoginPage.vue")
            },
            {
                path: "registration",
                name: "registration",
                component: () => import("@/pages/login/ui/RegistrationPage.vue")
            },
            {
                path: "account-setting",
                component: () => import("@/pages/home/ui/HomePage.vue")
            }
        ]
    },
    {
        path: "/psn",
        meta: { requiresAuth: true },
        children: [
            {
                path: "",
                name: "profile",
                meta: { requiresAuth: true },
                component: () => import("@/pages/profile/ui/ProfilePage.vue")
            },
            {
                path: "friends",
                children: [
                    {
                        path: "",
                        meta: { requiresAuth: true },
                        component: () => import("@/pages/home/ui/HomePage.vue")
                    },
                    {
                        path: "add",
                        meta: { requiresAuth: true },
                        component: () => import("@/pages/home/ui/HomePage.vue")
                    },
                    {
                        path: ":id",
                        meta: { requiresAuth: true },
                        component: () => import("@/pages/profile/ui/ProfilePage.vue")
                    }
                ]
            }
        ]
    },
    {
        path: "/conundrums",
        children: [
            { path: "", component: () => import("@/pages/home/ui/HomePage.vue") },
            {
                path: "riddles",
                component: () => import("@/pages/home/ui/HomePage.vue")
            },
            {
                path: "schoolPrg",
                component: () => import("@/pages/home/ui/HomePage.vue")
            }
        ]
    },
    {
        path: "/basket",
        children: [
            {
                path: "",
                name: "basket",
                component: () => import("@/pages/basket/ui/BasketPage.vue")
            },
            {
                path: "payment",
                name: "payment",
                component: () => import("@/pages/payment/ui/PaymentPage.vue")
            }
        ]
    }
];

export const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
});

router.beforeEach((to, _from, next) => {
    const sessionStore = useSessionStore();

    if (to.meta.requiresAuth && !sessionStore.isAuth) {
        next("/login");
    } else if (to.path === "/login" && sessionStore.isAuth) {
        next("/psn");
    } else {
        next();
    }
});
