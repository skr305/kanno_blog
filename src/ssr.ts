import { createSSRApp } from 'vue'
import { createMemoryHistory } from 'vue-router'
import { renderToString } from '@vue/server-renderer'
import type { ExtendableContext } from 'koa'
import { createVueApp, VueApp } from './app/main'
import { INVALID_ERROR, SUCCESS_CODE } from './constants/http-state'

export interface RenderResult {
  code: number
  html: string
  _document: string
}

// create vue App instance

const createVueAppInstance = () => {
  const app = createVueApp({
    appCreator: createSSRApp,
    histroyCreator: createMemoryHistory
  })
  return app
}

const renderScripts = (data: any) => {}

const renderHTML = async (vueApp: VueApp, url: string) => {
  const { app, router, _document } = vueApp
  await router.push(url)
  await router.isReady()

  const ssrContext = {} as any
  const html = await renderToString(app, ssrContext)
  const _doc = await renderToString(_document)

  return { html, _document: _doc }
}

/**
 * handle error
 * @name error render
 * 1. server runtime err
 * 2. render  err
 * 3. router not found(404)
 */

export const renderError = async (ctx: ExtendableContext, err: Error): Promise<RenderResult> => {
  const { app, _document, globalState } = createVueAppInstance()
  globalState.setRenderError(err)
  const res = {
    code: (err as any).code ?? INVALID_ERROR,
    html: await renderToString(app),
    _document: await renderToString(_document)
  }
  return res
}

// render application

export const renderAPPlication = async (ctx: ExtendableContext) => {
  const app = createVueAppInstance()
  const url = ctx.originalUrl
  try {
    const rendered = await renderHTML(app, url)
    return {
      code: SUCCESS_CODE,
      ...rendered
    }
  } catch (error) {
    return renderError(ctx, error)
  }
}
