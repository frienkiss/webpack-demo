const path = require('path')

const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const DefinePlugin = require('webpack/lib/DefinePlugin')
const webWebpackPlugin = require('web-webpack-plugin')

module.exports = {
    entry: {
        app: '/src/main.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, './dist')
    },
    // loaders
    module: {
        rules: [
            {
                test: /\.js$/,
                use: ['babel-loader'],
                // 除了node_modules里的文件
                exclude: path.resolve(__dirname, 'node_modules')
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    use: ['css-loader?minimize']
                })
            }
        ]
    },
    plugins: [
        new webWebpackPlugin({
            template: './template.html', //路径
            filename: 'index.html'
        }),
        new ExtractTextPlugin({
            filename: '[name]_[chunkhash:8].css'
        }),
        new DefinePlugin({
            // 定义NODE_env
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new UglifyJsPlugin({
            // 最紧凑的输出
            beautify: true,
            // 删掉所有注释
            comments: false,
            compress: {
                
            }
        })
    ]
}