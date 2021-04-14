const path = require('path')
// const webpack = require('webpack')
const cssTIQU = require('mini-css-extract-plugin')
// const VueLoaderPlugin = require('vue-server-renderer/client-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

// const htmlPlugin = require('html-webpack-plugin')

const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

const isProd = process.env.NODE_ENV === 'production'
const bundleAnalyzerConfig = {
  //  可以是`server`，`static`或`disabled`。
  //  在`server`模式下，分析器将启动HTTP服务器来显示软件包报告。
  //  在“静态”模式下，会生成带有报告的单个HTML文件。
  //  在`disabled`模式下，你可以使用这个插件来将`generateStatsFile`设置为`true`来生成Webpack Stats JSON文件。
  analyzerMode: 'server',
  //  将在“服务器”模式下使用的主机启动HTTP服务器。
  analyzerHost: '127.0.0.1',
  //  将在“服务器”模式下使用的端口启动HTTP服务器。
  analyzerPort: 8888,
  //  路径捆绑，将在`static`模式下生成的报告文件。
  //  相对于捆绑输出目录。
  reportFilename: 'report.html',
  //  模块大小默认显示在报告中。
  //  应该是`stat`，`parsed`或者`gzip`中的一个。
  //  有关更多信息，请参见“定义”一节。
  defaultSizes: 'parsed',
  //  在默认浏览器中自动打开报告
  openAnalyzer: false,
  //  如果为true，则Webpack Stats JSON文件将在bundle输出目录中生成
  generateStatsFile: false,
  //  如果`generateStatsFile`为`true`，将会生成Webpack Stats JSON文件的名字。
  //  相对于捆绑输出目录。
  statsFilename: 'stats.json',
  //  stats.toJson（）方法的选项。
  //  例如，您可以使用`source：false`选项排除统计文件中模块的来源。
  //  在这里查看更多选项：https：  //github.com/webpack/webpack/blob/webpack-1/lib/Stats.js#L21
  statsOptions: null,
  logLevel: 'info' // 日志级别。可以是'信息'，'警告'，'错误'或'沉默'。
}

module.exports = {
  mode: isProd ? 'production' : 'development',
  // entry: {
  //   app: path.join(__dirname, '../src/entry-client.js')
  // },
  devtool: isProd
    ? false
    : 'cheap-module-source-map',
  output: {
    path: path.resolve(__dirname, '../dist'),
    // publicPath: '/dist/',
    publicPath: isProd ? '/dist/' : 'http://0.0.0.0:8000/dist/',
    // publicPath: '/public/',
    filename: '[name].[chunkhash:5].js'
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
        include: /src/,
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
  // optimization: isProd ? {
  //     runtimeChunk: {
  //         name: 'runtime'
  //     },
  //     splitChunks: {
  //         chunks: 'all'
  //     }
  // } : {},
  plugins: isProd
    ? [
        // new webpack.optimize.CommonsChunkPlugin({
        //   name: 'manifest',
        //   minChunks: Infinity
        // }),
        new BundleAnalyzerPlugin(bundleAnalyzerConfig),
        new VueLoaderPlugin(),
        // new webpack.DefinePlugin({
        //   'process.env': isDev ? '"development"' : '"production"'
        // }),
        // new webpack.DefinePlugin({
        //   'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
        //   'process.env.VUE_ENV': '"client"'
        // }),
        new cssTIQU({
            filename: 'css/[name].[contentHash:5].css',
            chunkFilename: '[name].[contentHash:5].css'
        })
        // new htmlPlugin({
        //     template: path.join(__dirname, '../src/index.html'),
        //     title: 'ssr-first'
        // })
        // new webpack.optimize.UglifyJsPlugin({
        //   compress: { warnings: false }
        // }),
        // new webpack.optimize.ModuleConcatenationPlugin(),
        // new ExtractTextPlugin({
        //   filename: 'common.[chunkhash].css'
        // })
      ]
    : [
        // new webpack.optimize.CommonsChunkPlugin({
        //   name: 'manifest',
        //   minChunks: Infinity
        // }),
        new BundleAnalyzerPlugin(bundleAnalyzerConfig),
        new VueLoaderPlugin(),
        // new webpack.DefinePlugin({
        //   'process.env': isDev ? '"development"' : '"production"'
        // }),
        // new webpack.DefinePlugin({
        //   'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
        //   'process.env.VUE_ENV': '"client"'
        // }),
        new FriendlyErrorsPlugin()
        // new htmlPlugin({
        //   template: path.join(__dirname, '../src/index.html'),
        //   title: 'ssr-first'
        // })
      ]
}
