const koaApp = require('koa')
const send = require('koa-send')
const path = require('path')
// const Vue = require('vue')
const app = new koaApp()
const pageRouter = require('./server-router')
app.use(async(ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*')
  ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With, yourHeaderFeild')
  ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS')
  ctx.set('Allow', 'PUT, POST, GET, DELETE, OPTIONS')
  if (ctx.method === 'OPTIONS') {

      ctx.body = 200

  } else {
      await next()
  }

})

app.use(async(ctx, next) => {
  if (ctx.path === '/favicon.ico') {
    console.log('favicon.icofavicon.ico')
      await send(ctx, '/favicon.ico', { root: path.join(__dirname, '../public') })
  } else {
      await next()
  }
})

// pageRouter.get('(.*)', async(ctx, next) => {
//   // console.log(renderer)
//   ctx.body = 123
//   await next()
// })

// 在服务器处理函数中……
// server.use(async(ctx, next) => {
//   console.log(111, ctx.req.url)
//   // const context = { url: req.url }
//   const context = { url: ctx.req.url, title: 'hello' }
//   // 这里无需传入一个应用程序，因为在执行 bundle 时已经自动创建过。
//   // 现在我们的服务器与应用程序已经解耦！
//   renderer.renderToString(context, (err, html) => {
//     console.log(222)
//     console.log(err)
//     // 处理异常……
//     if (err) {
//       // console.log(ctx.status, 'ctx.status')
//       if (ctx.status === 404) {
//         return ctx.res.end('Page not found')

//       } else if (ctx.status === 500) {
//         return ctx.res.end('Internal Server Error')
//       } else {
//         console.log(123456)
//         return ctx.res.end(123)
//       }
//     } else {
//       ctx.res.writeHead(200, {
//         'content-type': 'text/html;charset=utf8'
//       })
//       return ctx.res.end(html)
//     }
//   })
//   await next()
// })
app.use(pageRouter.routes()).use(pageRouter.allowedMethods())

app.listen(8090, () => {
  console.log('成功监听端口8090')
})
