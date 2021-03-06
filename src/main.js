import Vue from 'vue'
import App from './App.vue'
import { createStore } from './store/index'
import { createRouter } from './router/index'
// 方便在vuex 中 使用route 对象
import { sync } from 'vuex-router-sync'
import titleMixin from './util/title'
import * as filters from './util/filters'

// mixin for handling title
Vue.mixin(titleMixin)

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.mixin({
  beforeRouteUpdate (to, from, next) {
    const { asyncData } = this.$options
    if (asyncData) {
      asyncData({
        store: this.$store,
        route: to
      }).then(next).catch(next)
    } else {
      next()
    }
  }
})

// const store = createStore()
// const router = createRouter()

// sync(store, router)
// 正常开发这么写
// eslint-disable-next-line no-new
// new Vue({
//   router,
//   store,
//   render: h => h(App)
// }).$mount('#root')
// Expose a factory function that creates a fresh set of store, router,
// app instances on each call (which is called for each SSR request)

// ssr的时候 是这么写的 构建通用entry
export function createApp () {
  // create store and router instances
  const store = createStore()
  const router = createRouter()

  // sync the router with the vuex store.
  // this registers `store.state.route`
  sync(store, router)

  // create the app instance.
  // here we inject the router, store and ssr context to all child components,
  // making them available everywhere as `this.$router` and `this.$store`.
  const app = new Vue({
    router,
    store,
    render: h => h(App)
  })

  // expose the app, the router and the store.
  // note we are not mounting the app here, since bootstrapping will be
  // different depending on whether we are in a browser or on the server.
  return { app, router, store }
}
