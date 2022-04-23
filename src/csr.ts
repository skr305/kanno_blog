import { createApp, createSSRApp } from 'vue'
import { createWebHistory } from 'vue-router'
import { isSSR } from './app/environment'
import { createVueApp } from './app/main'
import { getSSRContext } from './un/context'
import { getClientLocalTheme } from './un/theme'

// app instance

const { app, router, globalState } = createVueApp({
  histroyCreator: createWebHistory,
  appCreator: isSSR ? createSSRApp : createApp,
  theme: isSSR ? getSSRContext('theme') : getClientLocalTheme()
})

router.beforeEach((_, __, next) => {
  next()
})

router.isReady().then(() => {
  app.mount('#app', isSSR).$nextTick(() => {
    globalState.setIsHydrate(true)
  })
})
