let webpack = require('webpack');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let HtmlWebpackPlugin = require("html-webpack-plugin");
const { TsConfigPathsPlugin } = require('awesome-typescript-loader');
let path = require("path");
let routeComponentRegex = /public\/src\/([^\/]+\/?[^\/]+).js$/;

let htmlWebpackPluginIndex = new HtmlWebpackPlugin({
    hash: false, //path.resolve(__dirname, 'views/template/index.html')
    filename: path.resolve(__dirname, 'views/index.html'), //最终生成的html文件
    template: path.resolve(__dirname, 'views/templates/index.html'),
    chunks: ['vendors', 'index'], //入口文件所依赖的js文件
    inject: 'define' //js文件插入到body最后一行
});
let htmlWebpackPluginLogin = new HtmlWebpackPlugin({
    hash: false, //path.resolve(__dirname, 'views/template/index.html')
    filename: path.resolve(__dirname, 'views/login.html'), //最终生成的html文件
    template: path.resolve(__dirname, 'views/templates/login.html'),
    chunks: ['vendors', 'login'], //入口文件所依赖的js文件
    inject: 'define' //js文件插入到body最后一行
});
htmlWebpackPluginIndex = require('./views/templates/injectAssetsIntoHtml')(htmlWebpackPluginIndex);
htmlWebpackPluginLogin = require('./views/templates/injectAssetsIntoHtml')(htmlWebpackPluginLogin);

module.exports = {
    entry: {
        index: path.resolve(__dirname, "public/src/index.js"),
        login: path.resolve(__dirname, "public/src/login.tsx"),
        vendors: [
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
        publicPath: '/dist/'
    },
    module: {
        rules: [{
            test: /\.js[x]?$/,
            use: [{
                loader: 'babel-loader',
                options: {
                    presets: [
                        "es2015",
                        "stage-0",
                        "react"
                    ],
                    plugins: ['transform-runtime', "transform-decorators-legacy"]
                }
            }],
            include: [path.resolve(__dirname, 'public/src')],
            exclude: /(node_modules|bower_components)/
        }, {
            test: /\.tsx?$/,
            use: ['awesome-typescript-loader']
        }, {
            test: routeComponentRegex,
            include: path.resolve(__dirname, 'public/src'),
            use: [{
                    loader: 'bundle-loader',
                    options: {
                        lazy: true
                    }
                },
                'babel-loader'
            ]
        }, {
            test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 50000,
                    name: '/imgs/[name].[ext]'
                }
            }]
        }, {
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                use: ["css-loader", "postcss-loader"],
                fallback: "style-loader",
            })
        }, {
            test: /\.scss$/,
            use: ExtractTextPlugin.extract({
                use: ["css-loader", "sass-loader"],
                fallback: "style-loader",
            })
        }]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.css', '.scss', '.tsx'],
        alias: {
            $redux: path.resolve(__dirname, 'public/src/redux'),
            $apis: path.resolve(__dirname, 'public/src/apis'),
            $components: path.resolve(__dirname, 'public/src/components'),
            $routes: path.resolve(__dirname, 'public/src/routes'),
            $styles: path.resolve(__dirname, 'public/src/styles'),
            $helper: path.resolve(__dirname, 'public/src/helper'),
            $utils: path.resolve(__dirname, 'public/src/utils'),
            $actions: path.resolve(__dirname, 'public/src/actions'),
        }
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: "vendors",
            filename: "vendors.js",
        }),
        htmlWebpackPluginIndex,
        htmlWebpackPluginLogin,

        //将模块暴露到全局去
        new webpack.ProvidePlugin({
            $: 'jquery'
        }),
        new ExtractTextPlugin("styles/[name].css"),

        new TsConfigPathsPlugin({
            configFileName: "tsconfig.json",
            compiler: "typescript"})
    ],
    devtool: 'source-map'
}
