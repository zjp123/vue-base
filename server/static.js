const Router = require('@koa/router')
const send = require('koa-send')
// const path = require('path')
const staticRouter = new Router({ prefix: '/dist' })
    // console.log('888888888888888')
staticRouter.get('/(.*)', async ctx => {
  console.log(ctx.path, 'ddddd')
    await send(ctx, ctx.path, { root: 'http://0.0.0.0:8000/dist/' })
    // await send(ctx, ctx.path)
    // await send(ctx, ctx.path)
})

module.exports = staticRouter
