import fs from 'fs'
import Koa from 'koa'
import path from 'path'
import KoaRouter from '@koa/router'
import { PROD_CLIENT_PATH, PROD_SERVER_PATH, PUBLIC_PATH } from '../helpers/config'
import { renderError, RenderResult } from '@/ssr'
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

  const { renderAPPlication } = require(path.resolve(PROD_SERVER_PATH, 'ssr.js'))

  const manifest = require(path.resolve(PROD_CLIENT_PATH, 'ssr-manifest.json'))

  router.get('/(.*)', async (ctx, next) => {
    try {
      const renderResult: RenderResult = await renderAPPlication(ctx, manifest)
      await next()
      ctx.set({ 'Content-Type': 'text/html' })
      ctx.state = renderResult.code
      ctx.body = resolveTemplate({ ...renderResult, template })
    } catch (error) {}
  })
}
