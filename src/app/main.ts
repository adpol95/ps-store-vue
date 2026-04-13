import { createApp as createVueApp } from 'vue'
import App from './ui/App.vue'
import { installProviders } from './providers'

export function createApp() {
  const app = createVueApp(App)
  installProviders(app)
  return app
}

