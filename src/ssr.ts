import { createSSRApp } from 'vue'
import serialize from 'serialize-javascript'
import { createMemoryHistory } from 'vue-router'
import { renderToString } from '@vue/server-renderer'
import type { ExtendableContext } from 'koa'
import { createVueApp, VueApp } from './app/main'
import { INVALID_ERROR, SUCCESS_CODE } from './constants/http-state'
import { getSSRContextByApp, renderSSRContextScript, renderSSRSymbleScript } from './un/context'
import { Theme, THEME_STORAGE_KEY } from './un/theme'
import { useHead } from '@vueuse/head'

export interface RenderResult {
  code: number
  html: string
  _document: string
  scripts: string
  theme: string
}

// create vue App instance

const createVueAppInstance = (ctx: ExtendableContext) => {
  const app = createVueApp({
    appCreator: createSSRApp,
    histroyCreator: createMemoryHistory,
    theme: (ctx.cookies.get(THEME_STORAGE_KEY) as Theme) || Theme.Light
  })
  return app
}

const renderScripts = (data: any) => {
  const ssrSymbleScript = renderSSRSymbleScript()
  const ssrContextScript = renderSSRContextScript(serialize(data))
  return [ssrSymbleScript, ssrContextScript].join('\n')
}

const renderHTML = async (vueApp: VueApp, url: string) => {
  const { app, router, _document, theme } = vueApp
  await router.push(url)
  await router.isReady()
  const _theme = theme.theme.value
  const ssrContext = {} as any
  const html = await renderToString(app, ssrContext)
  const _doc = await renderToString(_document)
  const scripts = renderScripts({
    theme: theme.theme.value,
    ...getSSRContextByApp(app)
  })

  return { html, _document: _doc, scripts, theme: _theme }
}

/**
 * handle error
 * @name error render
 * 1. server runtime err
 * 2. render  err
 * 3. router not found(404)
 */

export const renderError = async (ctx: ExtendableContext, err: Error): Promise<RenderResult> => {
  const { app, _document, globalState, theme } = createVueAppInstance(ctx)
  globalState.setRenderError(err)

  const res = {
    code: (err as any).code ?? INVALID_ERROR,
    html: await renderToString(app),
    _document: await renderToString(_document),
    theme: theme.theme.value,
    scripts: renderScripts({
      theme: theme.theme.value,
      ...getSSRContextByApp(app)
    })
  }
  return res
}

// render application

export const renderAPPlication = async (ctx: ExtendableContext) => {
  const app = createVueAppInstance(ctx)
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
