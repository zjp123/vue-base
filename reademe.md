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
读取图片失败问题：所有静态文件的处理 都得它处理 深坑
koa-send

koa-router 正则写法不好用

ctx在别的异步函数里面 执行的问题

createReadStream 与 readFileSync它的区别
