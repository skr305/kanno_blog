import App from './App.vue'
import _Document from './_document.vue'
import { createSSRApp } from 'vue'
import { createHead } from '@vueuse/head'
import { createRouter, getRoutes } from './router'
import { UIRegister } from './plugins/ui'

export const createApp = () => {
  const app = createSSRApp(App)
  const _document = createSSRApp(_Document)
  const head = createHead()
  const router = createRouter()
  app.use(router).use(head)
  UIRegister(app)
  return { app, router, head, routes: getRoutes(), _document }
}
