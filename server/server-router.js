const Router = require('@koa/router')
const pageRouter = new Router()
const fs = require('fs')
const path = require('path')
const resolvePath = file => path.resolve(__dirname, file)
const send = require('koa-send')

const { createBundleRenderer } = require('vue-server-renderer')
const fileName = path.join(__dirname, './index.html')
// const fileName = path.join(__dirname, '../dist/index.html')
const template = fs.readFileSync(fileName, 'utf-8')
// const serverBundle = require('fs').readFileSync(path.join(__dirname, '../dist/vue-ssr-server-bundle.json'), 'utf-8')
const serverBundle = require('../dist/vue-ssr-server-bundle.json')
// 还差这个
// const clientManifest = require('fs').readFileSync(path.join(__dirname, '../dist/vue-ssr-client-manifest.json'), 'utf-8')
const clientManifest = require('../dist/vue-ssr-client-manifest.json')

const renderer = createBundleRenderer(serverBundle, {
  runInNewContext: false, // 推荐
  template, // （可选）页面模板
  basedir: resolvePath('../dist'),
  clientManifest // （可选）客户端构建 manifest
})
pageRouter.get('/dist/(.*)', async(ctx, next) => {
  // console.log(ctx.path, path.join(__dirname, '../' + ctx.path), '2paththththh')
  // ctx.res.writeHead(200, { 'Content-type': 'image/jpg' })
  if (ctx.path.includes('images')) {
    // console.log(ctx.path, 'pathththh')
    // ctx.headers['Content-Type'] = 'image/jpg;charset=UTF-8'
    // const data = fs.readFileSync(path.join(__dirname, '../' + ctx.path))
    // console.log(data, 'lllllllllllll')
    // ctx.body = data
    // await next()
    // return
    await send(ctx, ctx.path)
    // ctx.body = fs.createReadStream(path.join(__dirname, '../' + ctx.path))
    return

  }
  const data = fs.readFileSync(path.join(__dirname, '../' + ctx.path), 'utf-8')
  ctx.headers['Content-Type'] = 'application/javascript;charset=UTF-8'
  ctx.body = data
  // fs.readFile(path.join(__dirname, '../' + ctx.path), function(_err, data) {
  //   // req表示请求，request;  res表示响应，response
  //   // 设置HTTP头部，状态码是200，文件类型是html，字符集是utf8
  //   ctx.headers['Content-Type'] = 'application/javascript;charset=UTF-8'
  //   console.log()
  //   ctx.body = data
  // })
  // console.log(data, 'datatatat')
  // return ctx.res.end(data)
  // return resolvePath('../dist')
})
pageRouter.get('(.*)', async(ctx, next) => {
  // await serverRender(ctx, renderer, template)
  console.log(111, ctx.req.url)
  // ctx.body = 999
  // const context = { url: req.url }
  const context = { url: ctx.req.url, title: 'hello' }
  // 这里无需传入一个应用程序，因为在执行 bundle 时已经自动创建过。
  // 现在我们的服务器与应用程序已经解耦！
  // renderer.renderToString(context, (err, html) => {
  //   console.log(222)
  //   console.log(err)
  //   // 处理异常……
  //   if (err) {
  //     // console.log(ctx.status, 'ctx.status')
  //     if (ctx.status === 404) {
  //       ctx.body = 'Page not found'

  //     } else if (ctx.status === 500) {
  //       ctx.body = 'Internal Server Error'
  //     } else {
  //       console.log(123456)
  //       ctx.body = 123
  //     }
  //   } else {
  //     console.log(9999, 'html')
  //     ctx.headers['Content-Type'] = 'text/html;charset=utf8'
  //     ctx.body = 99999
  //     // return ctx.res.end(html)
  //   }

  // })
  const appStr = await renderer.renderToString(context)
  // if (context.router.currentRoute.fullPath !== ctx.path) {
  //   return ctx.redirect(context.router.currentRoute.fullPath)
  // }
  ctx.body = appStr
})

module.exports = pageRouter
