import type { App as VueApp } from 'vue'
import { createPinia } from './pinia'
import { initZod } from './zod'

export function installProviders(app: VueApp) {
  app.use(createPinia())
  initZod()
}

