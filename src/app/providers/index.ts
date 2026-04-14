import type { App as VueApp } from "vue";

import pinia from "./pinia";
import { queryProvider } from "./query";
import { router } from "./router";

export function installProviders(app: VueApp) {
    app.use(pinia).use(router).use(queryProvider.plugin, queryProvider.options);
}
