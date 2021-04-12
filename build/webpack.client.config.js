const webpack = require('webpack')
const path = require('path')
const { merge } = require('webpack-merge')
const htmlPlugin = require('html-webpack-plugin')
const base = require('./webpack.base.config')
// const SWPrecachePlugin = require('sw-precache-webpack-plugin')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
const isProd = process.env.NODE_ENV === 'production'

let config
if (!isProd) { // 开发环境
  config = merge(base, {
    target: 'web',
    entry: {
      app: path.join(__dirname, '../src/entry-client.js')
    },
    // resolve: {
    //   alias: {
    //     'create-api': './create-api-client.js'
    //   }
    // },
    devServer: {
      port: 8000,
      host: '0.0.0.0', // 同一个局域网的ip都可以访问
      overlay: {
          errors: true // 错误显示到网页上
      },
      headers: { 'Access-Control-Allow-Origin': '*' },
      // publicPath: '/dist/',
      historyApiFallback: {
          index: '/dist/index.html' // 这个配置太重要了 如果不加上它，如果设置了output.public，启动服务后无法访问
      },
      // proxy: {
      //     '/api': 'http://127.0.0.1:3333/',
      //     '/user': 'http://127.0.0.1:3333/'
      // },
      hot: true,
      open: true
    },
    plugins: [
      // strip dev-only code in Vue source
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
        'process.env.VUE_ENV': '"client"'
      }),
      new htmlPlugin({
        template: path.join(__dirname, '../src/index.html'),
        title: 'ssr-first'
      }),
      // extract vendor chunks for better caching
      // new webpack.optimize.CommonsChunkPlugin({
      //   name: 'vendor',
      //   minChunks: function (module) {
      //     // a module is extracted into the vendor chunk if...
      //     return (
      //       // it's inside node_modules
      //       /node_modules/.test(module.context) &&
      //       // and not a CSS file (due to extract-text-webpack-plugin limitation)
      //       !/\.css$/.test(module.request)
      //     )
      //   }
      // }),
      // extract webpack runtime & manifest to avoid vendor chunk hash changing
      // on every build.
      // new webpack.optimize.CommonsChunkPlugin({
      //   name: 'manifest'
      // }),
      // 生成 `vue-ssr-client-manifest.json`。
      new VueSSRClientPlugin()
    ]
  })
}

if (isProd) {
  config = merge(base, {
    entry: {
      app: path.join(__dirname, '../src/entry-client.js')
    },
    target: 'web',
    optimization: { // 服务端渲染时 不可用这个
      runtimeChunk: {
          name: 'runtime'
      },
      splitChunks: {
          chunks: 'all'
      }
    },
    output: {
      path: path.resolve(__dirname, '../dist'),
      publicPath: '/dist/',
      filename: '[name].[chunkhash:5].js'
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
        'process.env.VUE_ENV': '"client"'
      }),
      new htmlPlugin({
        template: path.join(__dirname, '../src/index.html'),
        title: 'ssr-first'
      }),
      new VueSSRClientPlugin()
    ]
  })
}
// if (process.env.NODE_ENV === 'production') {
//   config.plugins.push(
//     // auto generate service worker
//     new SWPrecachePlugin({
//       cacheId: 'vue-hn',
//       filename: 'service-worker.js',
//       minify: true,
//       dontCacheBustUrlsMatching: /./,
//       staticFileGlobsIgnorePatterns: [/\.map$/, /\.json$/],
//       runtimeCaching: [
//         {
//           urlPattern: '/',
//           handler: 'networkFirst'
//         },
//         {
//           urlPattern: /\/(top|new|show|ask|jobs)/,
//           handler: 'networkFirst'
//         },
//         {
//           urlPattern: '/item/:id',
//           handler: 'networkFirst'
//         },
//         {
//           urlPattern: '/user/:id',
//           handler: 'networkFirst'
//         }
//       ]
//     })
//   )
// }

module.exports = config
