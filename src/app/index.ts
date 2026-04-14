import { createApp as createVueApp } from "vue";

import { installProviders } from "./providers";
import App from "./ui/App.vue";

export function createApp() {
    const app = createVueApp(App);
    installProviders(app);
    return app;
}
