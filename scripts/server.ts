import Koa from 'koa'
import Router from '@koa/router'
import path from 'path'
import c2k from 'koa-connect'
import fs from 'fs'

const cwd = process.cwd()

const createServer = async (root = cwd, isProd = process.env.NODE_ENV === 'production') => {
  const resolve = (p) => path.resolve(cwd, p)
  const indexProd = isProd ? fs.readFileSync(resolve('dist/client/index.html'), 'utf-8') : ''
  const manifest = isProd ? require('../dist/client/ssr-manifest.json') : {}

  const app = new Koa()
  const router = new Router()
  /**
   * @type {import('vite').ViteDevServer}
   */
  let vite
  if (!isProd) {
    vite = await require('vite').createServer({
      root,
      server: {
        middlewareMode: 'ssr',
        watch: {
          usePolling: true,
          interval: 100
        }
      }
    })
    app.use(c2k(vite.middlewares))
  } else {
    app.use(require('koa-compress')())
    app.use(
      require('koa-static')(resolve('dist/client'), {
        index: false
      })
    )
  }
  router.get('/(.*)', async (ctx, next) => {
    try {
      const url = ctx.originalUrl
      let template, render
      if (!isProd) {
        template = fs.readFileSync(resolve('index.html'), 'utf-8')
        template = await vite.transformIndexHtml(url, template)
        render = (await vite.ssrLoadModule('/src/entry-server.ts')).render
      } else {
        template = indexProd
        render = require('../dist/server/entry-server.js').render
      }
      const [appHtml, preloadLinks, headTags, htmlAttrs, bodyAttrs] = await render(url, manifest)
      const html = template
        .replace('<!--document-title-->', headTags)
        .replace(`<!--preload-links-->`, preloadLinks)
        .replace(`<!--app-html-->`, appHtml)
      await next()
      ctx.set({ 'Content-Type': 'text/html' })
      ctx.body = html
      ctx.state = 200
    } catch (error) {
      vite && vite.ssrFixStacktrace(error)
      console.log(error.stack)
      ctx.state = 500
      ctx.body = error.stack
    }
  })
  app.use(router.routes()).use(router.allowedMethods())

  return { app, vite }
}

createServer().then(({ app }) =>
  app.listen(3000, () => {
    console.log('http://localhost:3000')
  })
)
