import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";

import HomePage from "@/pages/home/ui/HomePage.vue";

const routes: RouteRecordRaw[] = [
    {
        path: "/",
        component: HomePage,
        children: [
            {
                path: "",
                component: HomePage
            },
            {
                path: "games",
                children: [
                    { path: "", component: HomePage },
                    { path: ":id", component: HomePage }
                ]
            },
            {
                path: "consoles",
                children: [
                    { path: "", component: HomePage },
                    { path: ":id", component: HomePage }
                ]
            },
            {
                path: "accessories",
                children: [
                    { path: "", component: HomePage },
                    { path: ":id", component: HomePage }
                ]
            },
            {
                path: "news",
                children: [
                    { path: "", component: HomePage },
                    { path: ":id", component: HomePage }
                ]
            },
            {
                path: "authorization",
                children: [
                    { path: "", component: HomePage },
                    { path: "registration", component: HomePage },
                    { path: "account-setting", component: HomePage }
                ]
            },
            {
                path: "psn",
                meta: { requiresAuth: true },
                component: HomePage,
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
                path: "conundrums",
                children: [
                    { path: "", component: HomePage },
                    { path: "riddles", component: HomePage },
                    { path: "schoolPrg", component: HomePage }
                ]
            },
            {
                path: "basket",
                children: [
                    { path: "", component: HomePage },
                    { path: "payment", component: HomePage }
                ]
            }
        ]
    }
];

export const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
});
