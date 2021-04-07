// entry-server.js
import { createApp } from './main'

export default context => {
  // 这个context 是 服务端渲染时 传过来的参数

  // 因为有可能会是异步路由钩子函数或组件，所以我们将返回一个 Promise，
    // 以便服务器能够等待所有的内容在渲染前，
    // 就已经准备就绪。
  return new Promise((resolve, reject) => {
    const { app, router, store } = createApp()
    // console.log(app, 'apppppp')

    // eslint-disable-next-line no-unused-vars
    const { url, ctx } = context
    const { fullPath } = router.resolve(url).route
    // 这个ctx是在server render时 传过来的
    console.log(url, fullPath, 'lallalal')
    // if (fullPath !== url) {
    //   return reject(new Error(url)) // 这个地方不能报错 处理
    //   // return ctx.redirect(fullPath)
    // }
    // 设置服务器端 router 的位置
    router.push(url)

    // 等到 router 将可能的异步组件和钩子函数解析完
    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents()
      // 匹配不到的路由，执行 reject 函数，并返回 404
      if (!matchedComponents.length) {
        return reject(new Error({ code: 404 }))
      }
      // 对所有匹配的路由组件调用 `asyncData()`
      // eslint-disable-next-line array-callback-return
      Promise.all(matchedComponents.map(Component => {
        if (Component.asyncData) {
          return Component.asyncData({
            store,
            route: router.currentRoute
          })
        }
      })).then(() => {
        // 在所有预取钩子(preFetch hook) resolve 后，
        // 我们的 store 现在已经填充入渲染应用程序所需的状态。
        // 当我们将状态附加到上下文，
        // 并且 `template` 选项用于 renderer 时，
        // 状态将自动序列化为 `window.__INITIAL_STATE__`，并注入 HTML。
        context.state = store.state
        // 当使用 template 时，context.state 将作为 window.__INITIAL_STATE__ 状态，自动嵌入到最终的 HTML 中。
        context.router = router // 这一步非常重要 这是把浏览器端的router对象 赋值给 在服务端渲染时的上下文中，用来处理前端redirect的路由，路由不一致问题

        resolve(app)
      }).catch(reject)

      // Promise 应该 resolve 应用程序实例，以便它可以渲染
      // resolve(app)
    }, reject)
  })
}
