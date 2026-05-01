import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";

import { useSessionStore } from "@/entities/session";
import { HomePage, LoginPage, ProfilePage } from "@/pages";
import { NewsDetailsPage } from "@/pages/news-details";
import ProductDetailsPage from "@/pages/product-details/ui/ProductDetailsPage.vue";
import ProductsPage from "@/pages/products/ui/ProductsPage.vue";

const routes: RouteRecordRaw[] = [
    {
        path: "/",
        name: "home",
        component: HomePage
    },
    {
        path: "/login",
        name: "login",
        component: LoginPage
    },
    {
        path: "/games",
        name: "games",
        component: ProductsPage
    },
    {
        path: "/games/:id",
        name: "game-details",
        component: ProductDetailsPage
    },
    {
        path: "/consoles",
        name: "consoles",
        component: ProductsPage
    },
    {
        path: "/consoles/:id",
        name: "console-details",
        component: ProductDetailsPage
    },
    {
        path: "/accessories",
        name: "accessories",
        component: ProductsPage
    },
    {
        path: "/accessories/:id",
        name: "accessory-details",
        component: ProductDetailsPage
    },
    {
        path: "/news",
        name: "news",
        component: HomePage
    },
    {
        path: "/news/:id",
        name: "news-details",
        component: NewsDetailsPage
    },
    {
        path: "/authorization",
        children: [
            { path: "", component: LoginPage },
            { path: "registration", component: HomePage },
            { path: "account-setting", component: HomePage }
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
                component: ProfilePage
            },
            {
                path: "friends",
                children: [
                    {
                        path: "",
                        meta: { requiresAuth: true },
                        component: HomePage
                    },
                    {
                        path: "add",
                        meta: { requiresAuth: true },
                        component: HomePage
                    },
                    {
                        path: ":id",
                        meta: { requiresAuth: true },
                        component: ProfilePage
                    }
                ]
            }
        ]
    },
    {
        path: "/conundrums",
        children: [
            { path: "", component: HomePage },
            { path: "riddles", component: HomePage },
            { path: "schoolPrg", component: HomePage }
        ]
    },
    {
        path: "/basket",
        children: [
            { path: "", component: HomePage },
            { path: "payment", component: HomePage }
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
