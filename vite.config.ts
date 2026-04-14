import vue from "@vitejs/plugin-vue";
import path from "node:path";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
    plugins: [vue()],
    server: {
        host: true,
        open: true
    },
    preview: {
        port: 5173
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
            "app": path.resolve(__dirname, "./src/app"),
            "pages": path.resolve(__dirname, "./src/pages"),
            "widgets": path.resolve(__dirname, "./src/widgets"),
            "features": path.resolve(__dirname, "./src/features"),
            "entities": path.resolve(__dirname, "./src/entities"),
            "shared": path.resolve(__dirname, "./src/shared")
        }
    }
});
