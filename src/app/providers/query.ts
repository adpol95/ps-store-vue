// src/app/providers/query.ts
import { QueryClient, VueQueryPlugin } from "@tanstack/vue-query";

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 5, // 5 минут
            retry: 1
        }
    }
});

export const queryProvider = {
    plugin: VueQueryPlugin,
    options: { queryClient }
};
