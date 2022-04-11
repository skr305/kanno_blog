import fs from 'fs'
import path from 'path'
import Koa from 'koa'
import KoaRouter from '@koa/router'
import c2k from 'koa-connect'
import { createServer } from 'vite'
import { ROOT_PATH } from '../helpers/config'
import { resolveTemplate } from './template'

export const devRenderServer = async (app: Koa, router: KoaRouter) => {
  const viteServer = await createServer({
    root: ROOT_PATH,
    logLevel: 'info',
    server: {
      middlewareMode: 'ssr',
      watch: {
        usePolling: true,
        interval: 100
      }
    }
  })

  //   use vite content as  middlewares
  app.use(c2k(viteServer.middlewares))

  router.get('/(.*)', async (ctx, next) => {
    let template = fs.readFileSync(path.resolve(ROOT_PATH, 'index.html'), 'utf8')

    const { renderAPPlication, renderError } = await viteServer.ssrLoadModule('/src/ssr.ts')

    try {
      const url = ctx.originalUrl
      template = await viteServer.transformIndexHtml(url, template)

      const renderResult = await renderAPPlication(ctx)
      await next()
      ctx.status = renderResult.code
      ctx.set({ 'Content-Type': 'text/html' })
      ctx.body = resolveTemplate({ ...renderResult, template })
    } catch (error) {
      viteServer.ssrFixStacktrace(error)
      const renderResult = await renderError(ctx, error)
      ctx.status = renderResult.code
      ctx.body = resolveTemplate({ ...renderResult, template })
    }
  })
}
