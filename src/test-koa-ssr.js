const Vue = require('vue')
const koaApp = require('koa')
const server = new koaApp()
const renderer = require('vue-server-renderer').createRenderer()

server.use((ctx, next) => {
  console.log(111)
  const app = new Vue({
    data: {
      url: ctx.req.url
    },
    template: '<div>访问的 URL 是： {{url}}</div>'
  })

  renderer.renderToString(app, (err, html) => {
    console.log(html, 'htmlhtml')
    if (err) {
      ctx.status === 500 && ctx.res.end('Internal Server Error')
      return
    }
    ctx.res.writeHead(200, {
      'content-type': 'text/html;charset=utf8'
    })
    ctx.res.end(`
      <!DOCTYPE html>
      <html lang="en">
        <head><title>Hello</title></head>
        <body>${html}</body>
      </html>
    `)
  })
})

server.listen(8090)
