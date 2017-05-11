var webpack = require('webpack');
var path = require("path");
var ROOT_PATH = path.resolve(__dirname);

module.exports = {
    entry:{
        index:path.resolve(__dirname, "public/javascripts/src/index.js"),
    }
    output: {
        path: path.resolve(ROOT_PATH, 'public/javascripts/dist/'),
        filename: "[name].[hash].js"
    },
    module: {
        rules: [{
            test: /\.js$/,
            loader: 'babel-loader'
        }, {
            test: /\.css$/,
            loader: "style!css"
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            hash:true,
            filename:path.resolve(ROOT_PATH, 'views/index.html'),//最终生成的html文件
            template:path.resolve(ROOT_PATH, 'public/template/index.html'),//模板
            chunks:['vendor', 'index'], //入口文件所依赖的js文件
            inject:'body' //js文件插入到body最后一行
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.LoaderOptionsPlugin({
            options: {
                loaders: [{
                    test: /\.js$/,
                    loader: 'babel-loader',
                    query: {
                        presets: ['es2015']
                    }
                }, {
                    test: /\.css$/,
                    loader: "style!css"
                }, ]
            }
        }),
        //提取公共代码
        new webpack.optimize.CommonsChunkPlugin({
            name:'vendor',
            filename:'[name].[hash:8].js',
            minChunk:3,//模块最少被引用以上3次
            chunks:['jquery', 'wangEditor']
        }),
        //单独打包css
        new ExtractTextPlugin('[name].[hash:8].css',{
            allChunks:true
        })
    ]

}
