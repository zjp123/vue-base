const koaApp = require('koa')
// const Vue = require('vue')
const server = new koaApp()
const path = require('path')
const rendererS = require('vue-server-renderer')

/*
const createApp = require('/path/to/built-server-bundle.js')

server.get('*', (req, res) => {
  const context = { url: req.url }

  createApp(context).then(app => {
    renderer.renderToString(app, (err, html) => {
      if (err) {
        if (err.code === 404) {
          res.status(404).end('Page not found')
        } else {
          res.status(500).end('Internal Server Error')
        }
      } else {
        res.end(html)
      }
    })
  })
})
*/

server.use((ctx, next) => {
  console.log(111)
  // 这样的方式不好 很容易导致交叉请求状态污染
  // const app = new Vue({
  //   data: {
  //     url: ctx.req.url
  //   },
  //   template: '<div>访问的 URL 是： {{url}}</div>'
  // })
  // 这样的话每次 我们不应该直接创建一个应用程序实例，而是应该暴露一个可以重复执行的工厂函数，为每个请求创建新的应用程序实例：
  // 在使用带有 { runInNewContext: true } 的 bundle renderer 时，可以消除此约束，但是由于需要为每个请求创建一个新的 vm 上下文，因此伴随有一些显著性能开销。
  const createApp = require('./test-app-ssr')
  const context = { url: ctx.req.url, title: 'hello' }
  const app = createApp(context)
  const fileName = path.join(__dirname, './index.html')
  const renderer = rendererS.createRenderer({
    template: require('fs').readFileSync(fileName, 'utf-8')
  })

  renderer.renderToString(app, context, (err, html) => {
    console.log(html, 'htmlhtml')
    if (err) {
      ctx.status === 500 && ctx.res.end('Internal Server Error')
      return
    }
    ctx.res.writeHead(200, {
      'content-type': 'text/html;charset=utf8'
    })
    ctx.res.end(html)
  })
})

server.listen(8090)
