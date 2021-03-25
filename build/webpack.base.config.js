const path = require('path')
const webpack = require('webpack')
const cssTIQU = require('mini-css-extract-plugin')
// const VueLoaderPlugin = require('vue-server-renderer/client-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

const htmlPlugin = require('html-webpack-plugin')

const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  entry: {
    app: './src/main.js'
  },
  devtool: isProd
    ? false
    : 'cheap-module-source-map',
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/dist',
    filename: '[name].[chunkhash].js'
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx', '.css', '.less', '.vue']
            // 指定vue运行的版本，提供的有很多版本，有些差别
            // alias: {
            //     vue: path.join(__dirname, '../node_modules/vue/dist/vue.esm.js')
            // }
    // alias: {
    //   'public': path.resolve(__dirname, '../public')
    // }
  },
  devServer: {
    port: 8000,
    host: '0.0.0.0', // 同一个局域网的ip都可以访问
    overlay: {
        errors: true // 错误显示到网页上
    },
    headers: { 'Access-Control-Allow-Origin': '*' },
    // publicPath: '/public/',
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
  module: {
    noParse: /es6-promise\.js$/, // avoid webpack shimming process
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          compilerOptions: {
            preserveWhitespace: false
          }
        }
      },
      {
        test: /\.(vue|js|jsx)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
        enforce: 'pre' // 预先使用它处理 然后在让别的loader处理
      },
      {
        test: /\.jsx$/,
        use: ['babel-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(gif|jpg|jpeg|png|svg)$/,
        use: [{
            loader: 'url-loader',
            options: {
              limit: 1024,
              esModule: false,
              name: 'images/[name].[hash:5].[ext]'
            }
        }]
      },
      // {
      //   test: /\.(png|jpg|gif|svg)$/,
      //   loader: 'url-loader',
      //   options: {
      //     limit: 10000,
      //     name: '[name].[ext]?[hash]'
      //   }
      // },
      {
        test: /\.(le|c)ss$/,
        use: isProd ? [
            cssTIQU.loader,
            'css-loader',
            {
                loader: 'postcss-loader',
                options: {
                    sourceMap: true
                }
            },
            // 'less-loader'
            {
              loader: 'less-loader',
              options: {
                  javascriptEnabled: true
              }
          }
        ] : [
              'vue-style-loader',
              'css-loader',
              {
                  loader: 'postcss-loader',
                  options: {
                      sourceMap: true
                  }
              },
              'less-loader'
            ]
      }
      // {
      //   test: /\.styl(us)?$/,
      //   use: isProd
      //     ? ExtractTextPlugin.extract({
      //         use: [
      //           {
      //             loader: 'css-loader',
      //             options: { minimize: true }
      //           },
      //           'stylus-loader'
      //         ],
      //         fallback: 'vue-style-loader'
      //       })
      //     : ['vue-style-loader', 'css-loader', 'stylus-loader']
      // },
    ]
  },
  // performance: {
  //   hints: false
  // },
  optimization: isProd ? {
      runtimeChunk: {
          name: 'runtime'
      },
      splitChunks: {
          chunks: 'all'
      }
  } : {},
  plugins: isProd
    ? [
        new VueLoaderPlugin(),
        // new webpack.DefinePlugin({
        //   'process.env': isDev ? '"development"' : '"production"'
        // }),
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
          'process.env.VUE_ENV': '"client"'
        }),
        new cssTIQU({
            filename: 'css/[name].[contentHash:5].css',
            chunkFilename: '[name].[contentHash:5].css'
        }),
        new htmlPlugin({
            template: path.join(__dirname, '../src/index.html')
        })
        // new webpack.optimize.UglifyJsPlugin({
        //   compress: { warnings: false }
        // }),
        // new webpack.optimize.ModuleConcatenationPlugin(),
        // new ExtractTextPlugin({
        //   filename: 'common.[chunkhash].css'
        // })
      ]
    : [
        new VueLoaderPlugin(),
        // new webpack.DefinePlugin({
        //   'process.env': isDev ? '"development"' : '"production"'
        // }),
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
          'process.env.VUE_ENV': '"client"'
        }),
        new FriendlyErrorsPlugin(),
        new htmlPlugin({
          template: path.join(__dirname, '../src/index.html')
        })
      ]
}
