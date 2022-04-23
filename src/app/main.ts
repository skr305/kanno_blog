/**
 * @file Vue App main entry file
 * @author Kanno
 */

import { CreateAppFunction } from 'vue'
import { createHead } from '@vueuse/head'
import { RouterHistory } from 'vue-router'
import App from './App.vue'
import { createGlobalState } from './state'
import _Document from '@/components/universal/_document.vue'
import ExtranalComponent from '@/plugins/ui'
import InternalComponent from '@/plugins/component'
import { createUniveralRouter } from './router'
import { createTheme, Theme } from '@/un/theme'
import { initlizeSSRContext } from '@/un/context'

export interface VueAppContext {
  appCreator: CreateAppFunction<Element>
  histroyCreator(base?: string): RouterHistory
  theme: Theme
}

export type VueApp = ReturnType<typeof createVueApp>

export const createVueApp = (context: VueAppContext) => {
  const app = context.appCreator(App)
  initlizeSSRContext(app)
  const _document = context.appCreator(_Document)
  const head = createHead()
  const globalState = createGlobalState()
  const router = createUniveralRouter({ history: context.histroyCreator() })

  const theme = createTheme(context.theme)

  // handle global error
  app.config.errorHandler = (error) => {
    globalState.setRenderError(error)
  }
  // handle router error https://next.router.vuejs.org/api/#onerror
  router.onError(globalState.setRenderError)

  router.beforeEach((to, _, next) => {
    if (to.meta.validate) {
      ;(to.meta as any)
        .validate()
        .then(next)
        .catch((err) => {
          const newError: any = new Error()
          newError.code = err.code
          newError.message = err.message
          next(newError)
        })
    } else {
      next()
    }
  })

  app.use(head)
  app.use(theme)
  app.use(router)
  app.use(ExtranalComponent)
  app.use(InternalComponent)
  app.use(globalState)

  return { app, head, router, _document, globalState, theme }
}
