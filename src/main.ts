import App from './App.vue'
import { createSSRApp } from 'vue'
import { createHead } from '@vueuse/head'
import { createRouter } from './router'
import { UIRegister } from './plugins/ui'

export const createApp = () => {
  const app = createSSRApp(App)
  const head = createHead()
  const router = createRouter()
  app.use(router).use(head)
  UIRegister(app)
  return { app, router, head }
}
