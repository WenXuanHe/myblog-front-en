let webpack = require('webpack');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let HtmlWebpackPlugin = require("html-webpack-plugin");
let path = require("path");
let routeComponentRegex = /public\/src\/([^\/]+\/?[^\/]+).js$/;

let htmlWebpackPluginIndex = new HtmlWebpackPlugin({
    hash:false,//path.resolve(__dirname, 'views/template/index.html')
    filename: path.resolve(__dirname, 'views/index.html'),//最终生成的html文件
    template: path.resolve(__dirname, 'views/templates/index.html'),
    chunks:['vendors', 'index'], //入口文件所依赖的js文件
    inject:'define' //js文件插入到body最后一行
});
let htmlWebpackPluginLogin = new HtmlWebpackPlugin({
    hash:false,//path.resolve(__dirname, 'views/template/index.html')
    filename: path.resolve(__dirname, 'views/login.html'),//最终生成的html文件
    template: path.resolve(__dirname, 'views/templates/login.html'),
    chunks:['vendors', 'login'], //入口文件所依赖的js文件
    inject:'define' //js文件插入到body最后一行
});
htmlWebpackPluginIndex = require('./views/templates/injectAssetsIntoHtml')(htmlWebpackPluginIndex);
htmlWebpackPluginLogin = require('./views/templates/injectAssetsIntoHtml')(htmlWebpackPluginLogin);

// let publicPath = 'http://localhost:3000/dist/';

module.exports = {
    entry: {
        index:path.resolve(__dirname, "public/src/index.js"),
        login:path.resolve(__dirname, "public/src/login.js"),
        vendors:[
            'react',
            'react-dom',
            'react-redux',
            'react-router',
            'redux',
            'redux-thunk',
            'lodash'
        ]
    },
    output: {
        path: path.resolve(__dirname, 'public/dist/'),
        filename: "[name].js",
        sourceMapFilename: '[file].map',
        //配置按需加载[chunkhash:5]
        chunkFilename: '[name].chunk.js',
        //给自动引用的生成文件加路径
        publicPath:'http://localhost:3000/dist/'
    },
    module: {
        loaders: [
            {
                test: /\.js[x]?$/,
                loader: 'babel',
                include: [path.resolve(__dirname, 'public/src')],
                exclude: /node_modules/,
                query: {
                    "presets":
                    [
                        "es2015",
                        "stage-0",
                        "react"
                    ],
                    'plugins':['transform-runtime']
                }
            },
            {
                test: routeComponentRegex,
                include: path.resolve(__dirname, 'src'),
                loaders: ['bundle?lazy', 'babel']
            },
            {
                test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
                loader: 'url-loader?limit=50000&name=[path][name].[ext]'
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style', ['css-loader'])
            },
            {
                test: /\.scss$/,//'postcss-loader?parser=postcss-scss'
                loader: ExtractTextPlugin.extract('style', ['css', 'sass'])
            }
        ]
    },
    resolve: {
        // root:path.resolve(__dirname, './public/src'),
        extensions: ['', '.js', '.jsx', '.css', '.scss'],
        alias: {
            $redux: path.resolve(__dirname, 'public/src/redux'),
            $components: path.resolve(__dirname, 'public/src/components'),
            $routes: path.resolve(__dirname, 'public/src/routes'),
            $styles: path.resolve(__dirname, 'public/src/styles'),
            $helper: path.resolve(__dirname, 'public/src/helper'),
            $utils: path.resolve(__dirname, 'public/src/utils'),
            $actions: path.resolve(__dirname, 'public/src/actions'),
        }
    },
    plugins:[
        new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),
        htmlWebpackPluginIndex,
        htmlWebpackPluginLogin,

        //将模块暴露到全局去
        new webpack.ProvidePlugin({
            $:'jquery'
        }),
        new ExtractTextPlugin("styles/[name].css"),
    ],
    devtool: 'source-map'
}
