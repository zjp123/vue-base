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


# webpack-cli 版本过高有问题

# memory-fs 只能读取该域名下的文件 跨端口 跨协议都不行, 并且只能是内存当中的 硬盘中的也不行

# koa-send root 参数什么意思
# 生产环境时 inject: false。这样设置时可以的，因为打包出来的文件是实体文件，所以自动混入时是可以的，开发环境时，如果设为false 那么因为本事是内存里的，比较虚拟，所以开发环境时 要么设为inject: true,要么手动注入！！
```
这是服务端打包后的文件资源，可以发现这里面没有静态资源--没有图片资源，也就是说，服务端打包不打包静态资源文件！！所以在配置开发环境的时候，客户端的开发环境配置中，output.publicPath字段，一定要配置成，客户端webpack-dev-server启动时的域名地址：
publicPath: isProd ? '/dist/' : 'http://0.0.0.0:8000/dist/',
后面/dist/ 这个路径一定要和服务端 webapck中output.publicPath字段一致，名字必须一样，这里都是/dist/，要不然它们在混合的时候，文件匹配不上！！

总结： 服务端渲染时  开发环境和生产环境的output.publicPath配置是不一样的，生产环境时可以配置一样的如：output.publicPath：'/dist/'，前提是：客户端打包的文件和服务端打包的文件 都在同一个域名，主机，地址下，在同一台机器，同一个目录里面，这样打包后的文件在混入的时候，才能找到正确的文件路径。
```
# 注意 client-entry 与 server-entry output.publicPath之间配置不同的影响 可能跑不通，资源无法响应
