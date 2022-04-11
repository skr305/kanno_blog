import fs from 'fs'
import Koa from 'koa'
import path from 'path'
import KoaRouter from '@koa/router'
import { PROD_CLIENT_PATH, PROD_SERVER_PATH, PUBLIC_PATH } from '../helpers/config'
import { resolveTemplate } from './template'

export const prodRenderServer = async (app: Koa, router: KoaRouter) => {
  // middleware

  app.use(
    require('koa-static')(path.resolve(PUBLIC_PATH), {
      index: false
    })
  )
  app.use(require('koa-compress')())

  const template = fs.readFileSync(path.resolve(PROD_CLIENT_PATH, 'index.html'), 'utf-8')

  const { renderAPPlication, renderError } = require(path.resolve(PROD_SERVER_PATH, 'ssr.js'))

  router.get('/(.*)', async (ctx, next) => {
    try {
      const renderResult = await renderAPPlication(ctx)
      await next()
      ctx.status = renderResult.code
      ctx.set({ 'Content-Type': 'text/html' })
      ctx.body = resolveTemplate({ ...renderResult, template })
    } catch (error) {
      const renderResult = await renderError(ctx, error)
      ctx.status = renderResult.code
      ctx.body = resolveTemplate({ ...renderResult, template })
    }
  })
}
