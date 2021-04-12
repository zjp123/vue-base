const Router = require('@koa/router')
const pageRouter = new Router()
// const koaApp = require('koa')
// const app = new koaApp()

const fs = require('fs')
const MFS = require('memory-fs')
const path = require('path')
// const resolvePath = file => path.resolve(__dirname, file)
// const send = require('koa-send')
const serverConfig = require('../build/webpack.server.config')
// const clientConfig = require('../build/webpack.client.config')
const webpack = require('webpack')
const axios = require('axios')
// const isProd = process.env.NODE_ENV === 'production'
const { createBundleRenderer } = require('vue-server-renderer')

const serverCompiler = webpack(serverConfig)
// const clientCompiler = webpack(clientConfig)
const mfs = new MFS()
serverCompiler.outputFileSystem = mfs

// const readFile = (clientpath, file) => {
//   try {
//     return fs.readFileSync(path.join(clientpath, file), 'utf-8')
//   } catch (e) {}
// }

// const clientCompiler = webpack(clientConfig)
// const devMiddleware = require('webpack-dev-middleware')(clientCompiler, {
//   publicPath: clientConfig.output.publicPath,
//   noInfo: true
// })
// app.use(devMiddleware)

let bundle
serverCompiler.watch({}, (err, stats) => {
    if (err) throw err
    stats = stats.toJson()
    stats.errors.forEach(err => console.log(err))
    stats.warnings.forEach(warn => console.warn(err))
    console.log(serverConfig.output.path, 'erverConfig.output.path')
    const bundlePath = path.join(
        serverConfig.output.path,
        'vue-ssr-server-bundle.json'
    )
    // 解析成 js文件
    const tempB = mfs.readFileSync(bundlePath, 'utf-8')
    bundle = JSON.parse(tempB)
    console.log('new bundle generated')
})

const fileName = path.join(__dirname, './index.html') // 这个可以用src文件夹里面的那个html文件
const template = fs.readFileSync(fileName, 'utf-8')

/*
pageRouter.get('/dist/(.*)', async(ctx, next) => {
  // 这个地方路由dist就是webpack outpath 中的publicPath 的重要之处，我这里设置的是dist，而实际上项目中的静态文件
  // 都放在项目下public文件夹中 这样一来dist路由与静态文件夹名称public 它们两个名字不一致 这就得你自己去特殊处理了，如果要想省事用send 来做
  // 那就得改成一样的
  // console.log(ctx.path, path.join(__dirname, '../' + ctx.path), '2paththththh')
  // ctx.res.writeHead(200, { 'Content-type': 'image/jpg' })
  if (ctx.path.includes('images')) {

    // ctx.headers['Content-Type'] = 'image/jpg;charset=UTF-8'
    // const data = fs.readFileSync(path.join(__dirname, '../' + ctx.path))
    // console.log(data, 'lllllllllllll')
    // ctx.body = data
    // await next()
    // return
    // await send(ctx, ctx.path)
    // await send(ctx, ctx.path, { root: path.join(__dirname, '../dist/') })
    await send(ctx, ctx.path)
    // console.log(path.join(__dirname, '../public/' + sourceName))
    // ctx.body = fs.createReadStream(path.join(__dirname, '../public/' + sourceName))
    return

  }
  // const data = fs.readFileSync(path.join(__dirname, '../' + ctx.path), 'utf-8')
  // const data = readFile(
  //   clientConfig.output.publicPath,
  //   ctx.path
  // )
  const data = mfs.readFileSync(bundlePath, 'utf-8')
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
*/

pageRouter.get('(.*)', async(ctx, next) => {
  // await serverRender(ctx, renderer, template)
  // console.log(111, ctx.req.url)
  // ctx.body = 999
  // const context = { url: req.url }
  const context = { url: ctx.req.url, title: 'hello', ctx }
  if (!bundle) {
    ctx.body = '还没弄好呢。。。'
  }
  const clientMiniFaset = await axios.get(// 获取客户端入口打包在内存的文件
    'http://0.0.0.0:8000/dist/vue-ssr-client-manifest.json'
  )
  const clientData = clientMiniFaset.data
  // console.log(clientData, 'clientData.clientData.clientData')

  // 读取不到文件 只能是内存
  // const testMemory = mfs.readFileSync(path.join(__dirname, '../public/favicon.ico'), 'utf-8')
  // console.log(testMemory, 'testMemorytestMemory')

  // const imageE = await axios.get(// 获取客户端入口打包在内存的文件
  //   'http://0.0.0.0:8000/dist/images/logo-48.450e6.png'
  // )
  // const imgData = imageE.data
  // console.log(imageE, 'imgDataimgData')
  // const tempPath = path.join(
  //   __dirname,
  //   './index.html'
  // )
  // const result = mfs.statSync(tempPath)
  // if (result.isFile()) {
  //   console.log(tempPath, '这是啥。。。。。')
  // }
  // console.log(result.isFile(), 'resultresult')
  // const clientMiniFaset = readFile(
  //   clientConfig.output.publicPath,
  //   'vue-ssr-client-manifest.json'
  // )
  // console.log(clientMiniFaset, 'clientMiniFasetclientMiniFaset')

  // const clientData = clientMiniFaset.data
  // const clientMiniFaset = mfs.readFileSync('http:/0.0.0.0:8000/dist/vue-ssr-client-manifest.json', 'utf-8')// 它mfs内存读取器 只能读取entry-serve入口打包的文件，entry-client打包的文件读取不到
  // console.log(clientMiniFaset, '到底是啥.....')

  const renderer = createBundleRenderer(bundle, {
    inject: true,
    template,
    // basedir: 'http:/0.0.0.0:8000/dist/',
    // const clientManifest = require('../dist/vue-ssr-client-manifest.json')
    clientManifest: clientData
  })
  const appStr = await renderer.renderToString(context)
  console.log(context.router.currentRoute.fullPath, 'oooooooooooo')
  if (context.router.currentRoute.fullPath !== ctx.path) {
    return ctx.redirect(context.router.currentRoute.fullPath)
  }
  ctx.body = appStr
})

module.exports = pageRouter
