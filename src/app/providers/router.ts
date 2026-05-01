import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";

import HomePage from "@/pages/home/ui/HomePage.vue";
import ProductDetailsPage from "@/pages/product-details/ui/ProductDetailsPage.vue";
import ProductsPage from "@/pages/products/ui/ProductsPage.vue";

const routes: RouteRecordRaw[] = [
    {
        path: "/",
        name: "home",
        component: HomePage
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
        path: "/authorization",
        children: [
            { path: "", component: HomePage },
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
                meta: { requiresAuth: true },
                component: HomePage
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
                        component: HomePage
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
