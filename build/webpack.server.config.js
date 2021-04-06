const webpack = require('webpack')
const { merge } = require('webpack-merge')
const base = require('./webpack.base.config')
const path = require('path')
// const nodeExternals = require('webpack-node-externals')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')

module.exports = merge(base, {
  target: 'node',
  entry: {
    // app: path.join(__dirname, '../src/test-bundle-koa-ssr.js')
    app: path.join(__dirname, '../src/entry-server.js')
  },
  devtool: 'source-map',
  // entry: path.join(__dirname, '../src/entry-server.js'),
  output: {
    // filename: 'server-bundle.js',
    publicPath: '/dist/',
    libraryTarget: 'commonjs2'
  },
  // resolve: {
  //   alias: {
  //     'create-api': './create-api-server.js'
  //   }
  // },
  // https://webpack.js.org/configuration/externals/#externals
  // https://github.com/liady/webpack-node-externals
  // externals: nodeExternals({
  //   // do not externalize CSS files in case we need to import it from a dep
  //   whitelist: /\.css$/
  // }),
  externals: Object.keys(require('../package.json').dependencies),
  // 默认文件名为 `vue-ssr-server-bundle.json`
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.VUE_ENV': '"server"'
    }),
    new VueSSRServerPlugin()
  ]
})
