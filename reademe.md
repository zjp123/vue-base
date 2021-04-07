# Can't set headers after they are sent
这个问题可能是ctx.res.end()造成的也可能是没设置下面这个
```
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
```
# 读取图片失败问题：所有静态文件的处理 都得它处理 深坑
# koa-send

# koa-router 正则写法不好用

# ctx在别的异步函数里面 执行的问题

# createReadStream 与 readFileSync它的区别


# createRender 它就是把vue实例打包后的文件 结合 html文件  渲染到浏览器

# 将数据进行响应式的过程在服务器上是多余的，所以默认情况下禁用。禁用响应式数据

# 请将副作用代码移动到 beforeMount 或 mounted 生命周期中

# 在使用带有 { runInNewContext: true } 的 bundle renderer 时，可以消除此约束，但是由于需要为每个请求创建一个新的 vm 上下文，因此伴随有一些显著性能开销。

# 生产环境 npm install npm run build
# entry-serve 这个入口负责 预获取数据，entry-client 也负责预获取数据 和 app.$mount(el), 服务端渲染时，然后在混入就OK了，无论服务端渲染还是客户端渲染，都是根据路由预先处理逻辑。

# render 方法中 参考api: Renderer 选项
  # context.head：（字符串）将会被作为 HTML 注入到页面的头部 (head) 里。
  # context.state：（对象）初始 Vuex store 状态，将以 window.__INITIAL_STATE__ 的形式内联到页面。


