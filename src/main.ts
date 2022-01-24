import App from './App.vue'
import { createSSRApp } from 'vue'
import { createRouter } from './router'
import { UIRegister } from './plugins/ui'

export const createApp = () => {
  const app = createSSRApp(App)
  const router = createRouter()
  app.use(router)
  UIRegister(app)
  return { app, router }
}
