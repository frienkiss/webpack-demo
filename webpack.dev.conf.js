const path = require('path')

//CommonJS2 写法
module.exports = {
    entry: './src/main.js', // 一个入口  一个入口文件
    entry: ['./src/main.js', './src/main1.js'], // 一个入口，两个入口文件
    entry: {
        a: '/main',
        b: '/main1' // 两个入口  两个入口文件
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        filename: '[name].js', // 多个入口生成不同模板名称的文件
        filename: '[chunkhash].js', // 使用文件内容的hash生成的文件名称，便于在浏览器中长期缓存
        publicPath: '/static/', //指定目录
        publicPath: '', //根目录
        library: 'myLibrary',
        libraryTarget: 'amd',
        //是否包含有用的文件路径信息到生成的代码里 ，为 boolean 类型
        pathinfo: true,
        //附加 Chunk 的文件名称
        chunkFilename :'[id]. j s ',
        chunkFilename :'[chunkhash].js',
        // JSONP 异步加载资源时的回调函数名称，需要和服务端搭配使用
        jsonpFunction :'myWebpackJsonp ',
        //生成的 Source Map 文件的名称
        sourceMapFilename :'[ f i 1 e ] . map ' ,
        //浏览器开发者工具里显示的源码模块名称
        devtoolModuleFilenameTemplate :'webpack:lll[resource-path ]',
        //异步加载跨域的资源时使用的方式
        crossOriginLoading:'use-credentials ',
        rossOriginLoading: 'anonymous',
        crossOriginLoading: false
    }
}