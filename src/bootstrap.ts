/**
 * @file Project start file.
 */

import { createKoaApp } from '@/server'
import { devRenderServer } from './server/render/dev'
import { prodRenderServer } from './server/render/prod'
import { isDev } from './environment'

createKoaApp().then(async ({ app, router, afterRouter }) => {
  isDev ? await devRenderServer(app, router) : await prodRenderServer(app, router)
  afterRouter()
  app.listen(8777, () => {
    console.log('[Server Listener on]: http://localhost:8777')
  })
})
