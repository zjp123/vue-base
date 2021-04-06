// this is aliased in webpack config based on server/client build
// import { createAPI } from 'create-api'

// const logRequests = !!process.env.DEBUG_API

// const api = createAPI({
//   version: '/v0',
//   config: {
//     databaseURL: 'https://hacker-news.firebaseio.com'
//   }
// })

// warm the front page cache every 15 min
// make sure to do this only once across all requests
// if (api.onServer) {
//   warmCache()
// }

// function warmCache () {
//   fetchItems((api.cachedIds.top || []).slice(0, 30))
//   setTimeout(warmCache, 1000 * 60 * 15)
// }

function fetch ({ url = null, method = null, data = null, params = null }) {
  // logRequests && console.log(`fetching ${child}...`)

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const val = [
        { name: '张三', age: 18 },
        { name: '李四', age: 19 },
        { name: '王二', age: 20 },
        { name: '赵五', age: 21 }
      ]
      resolve(val)
    }, 500)
    // axios({
    //   method,
    //   url,
    //   data: method === 'get' ? null : data,
    //   params,
    //   headers: { 'X-Requested-With': 'XMLHttpRequest' }
    // }).then(res => {
    //   // const val = res.data
    //   const val = [
    //     { name: '张三', age: 18 },
    //     { name: '李四', age: 19 },
    //     { name: '王二', age: 20 },
    //     { name: '赵五', age: 21 }
    //   ]
    //   resolve(val)
    // }, reject).catch(reject)
    // axios.get(child).then(res => {
    //   const val = res.data && res.data.d
    //   if (val) val.__lastUpdated = Date.now()
    //   cache && cache.set(child, val)
    //   logRequests && console.log(`fetched ${child}.`)
    //   resolve(val)
    // }, reject).catch(reject)
  })
}

export function fetchItem () {
  return fetch({})
}
