const path = require('path')

const VueLoaderPlugin = require('vue-loader/lib/plugin')
// const vueLoaderOption = require('./vue-loader.config')

// console.log(process.env.NODE_ENV, 'jsjsjsj')

// const isDev = process.env.NODE_ENV === 'development'

const config = {
    target: 'web',
    // mode: 'development',
    // entry: path.join(__dirname, '../src/client-entry.js'),
    entry: {
      app: path.join(__dirname, '../src/entry-client.js')
    },
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, '../dist'),
        publicPath: '/dist/'
        // publicPath: 'http://127.0.0.1:8000/public/'

    },
    resolve: {
        // 先尝试 ts，tsx 后缀的 TypeScript 源码文件
        extensions: ['.js', '.json', '.jsx', '.css', '.less', '.vue']
            // 指定vue运行的版本，提供的有很多版本，有些差别
            // alias: {
            //     vue: path.join(__dirname, '../node_modules/vue/dist/vue.esm.js')
            // }

    },
    module: {
        rules: [{
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                  compilerOptions: {
                    preserveWhitespace: false
                  }
                }
                // options: vueLoaderOption(isDev)
            },
            {
                test: /\.(vue|js|jsx)$/,
                loader: 'eslint-loader',
                exclude: /node_modules/,
                enforce: 'pre' // 预先使用它处理 然后在让别的loader处理
            },
            {
                test: /\.jsx$/,
                use: ['babel-loader']
            },
            {
                test: /\.js$/,
                use: ['babel-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.(gif|jpg|jpeg|png|svg)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 1024,
                        name: 'images/[name].[hash:5].[ext]'
                    }
                }]
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin()
    ]

}

module.exports = config
