// var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
var webpack = require('webpack')
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
// const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin')
// module.exports = function(env={}, arg) {
//     const plugins = []
//     const isProduction = env['production']
//     if(isProduction) {
//        let  plugin = new UglifyJsPlugin()
//        plugins.push(plugin)
//     }
//     return {
//         plugins: plugins,
//         devtool: isProduction ? undefined : 'source-map'
//     }
// }
 // extract-text-webpack-plugin@next beta版本，支持webpack4
module.exports = {
    mode: 'development',
    // entry: './src/index.tsx',
    entry: './src/ts/main.js',
    //context: ''
    output: {
        filename: 'bundlets.js',
        path: __dirname + '/dist'
    },
    devtool: 'source-map',
    resolve: {
        extensions: [ '.js', '.ts', '.tsx', '.json'],
        alias: {
            components: './src/components', // 将原来导入语句的components映射为 ./src/components路径
            'react$': '/path/to/react.min.js' // 将以react结尾的替换为/path/....  eg: import 'react'
        },
        mainFields: ['browser', 'main']
    },
    devServer: {
        hot: true,
        historyApiFallback: {
            // 路由命中
            rewrites: [
                {from: /^\/user/, to: 'user.html'},
                {from: /^\/game/, to: 'game.html'}
            ]
        },
        // 配置devServer http服务器的根目录，默认为当前的执行目录
        contentBase: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            { test: /\.tsx?$/, loader: "awesome-typescript-loader" },

            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
            // {
            //     test: /\.css$/,
            //     use: ['style-loader', 'css-loader'] 
            // }
            // {
            //     test: /\.css$/,
            //     loaders: ExtractTextPlugin.extract({
            //         use: ['css-loader']
            //     })
            // },
            // {
            //     test: /\.js$/,
            //     use: ['babel-loader?cacheDirectory'], // cachheDirectory用于缓存编译的结果，加快重新编译的速度
            //     include: path.resolve(__dirname, 'src')
            // },
            // {
            //     test: /\.scss$/,
            //     use: ['style-loader', 'css-loader', 'sass-loader'],
            //     exclude: path.resolve(__dirname, 'node_modules')
            // },
            // {
            //     test: /\.(gif|jpe?g|eot|woff)$/,
            //     use: 'file-loader' //对非文本文件使用file-loader
            // },
            // {
            //     test: /\.less/,
            //     use: [
            //         {
            //             loaders: 'less-loader',
            //             options: {
            //                 cacheDirectory: true
            //             },
            //             enforce: 'post' // post表示把less-loader放在最后执行   pre表示放在最前执行
            //         },
            //         // 其他loader
            //     ]
            // }
        ]
    },
 //1   noParse: /jquery | chartJS/, //忽略jquery, chartJS这些非模块化的文件，提高构建性能
 //2
    // noParse: (content) => {
    //     //content 一个模块的文件路径
    //     return /jquery | chartJS/.test(content) //reg.test
    // },
    externals: { //命名空间， 全局加载
        "react": 'React',
        "react-dom": 'ReactDOM'
    },
    plugins: [
        new ExtractTextPlugin({ // 单独将css提取成文件，而不是用js生成
            filename: `[name].css`,
            // contenthash hash名报错 删掉 ExtractTextPlugin，改用 MiniCssExtractPlugin
        })
    ]
}
