const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { TsConfigPathsPlugin } = require('awesome-typescript-loader');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require("path");
const routeComponentRegex = /public\/src\/views\/([^\/]+).tsx$/;
var LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

let injectAssetsIntoHtmlPath = path.resolve(__dirname, '../', './views/templates/injectAssetsIntoHtml');
let htmlWebpackPluginIndex = new HtmlWebpackPlugin({
    hash: false,
    filename: path.resolve(__dirname, '../', 'views/index.html'), //最终生成的html文件
    template: path.resolve(__dirname, '../', 'views/templates/index.html'),
    chunks: ['vendors', 'index'], //入口文件所依赖的js文件
    inject: 'define' //js文件插入到body最后一行
});
let htmlWebpackPluginLogin = new HtmlWebpackPlugin({
    hash: false,
    filename: path.resolve(__dirname, '../', 'views/login.html'), //最终生成的html文件
    template: path.resolve(__dirname, '../', 'views/templates/login.html'),
    chunks: ['vendors', 'login'], //入口文件所依赖的js文件
    inject: 'define' //js文件插入到body最后一行
});

htmlWebpackPluginIndex = require(injectAssetsIntoHtmlPath)(htmlWebpackPluginIndex);
htmlWebpackPluginLogin = require(injectAssetsIntoHtmlPath)(htmlWebpackPluginLogin);

var env = process.env.NODE_ENV.trim(); // 当前环境
var version = require('../package.json')['version'];

module.exports = {
    entry: {
        index: path.resolve(__dirname, '../', "public/src/index.tsx"),
        login: path.resolve(__dirname, '../', "public/src/login.tsx"),
        vendors: [
            'react',
            'react-dom',
            'react-redux',
            'react-router',
            'redux',
            'redux-thunk',
            'immutable',
            'classnames',
            'keymirror',
            // 'wangeditor',
            'react-router-dom'
        ]
    },
    output: {
        path: path.resolve(__dirname, '../', 'public/dist/'),
        filename: "[name].[hash:6].js",
        //配置按需加载[chunkhash:5]
        chunkFilename: '[name].[chunkhash:5].js',
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
                        ["es2015",{
                            'modules': false  //  允许tree shaking
                        }],
                        "stage-0",
                        "react"
                    ],
                    plugins: ['transform-runtime', "transform-decorators-legacy", 'lodash']
                }
            }],
            include: [path.resolve(__dirname, '../', 'public/src')],
            exclude: /(node_modules|bower_components)/
        },
        {
            test: /\.tsx?$/,
            use: ['awesome-typescript-loader']
        },
        // {
        //     test: /public\\src\\views(\\.*).tsx$/,
        //     use: [{
        //         loader: 'bundle-loader',
        //         options: {
        //             lazy: true
        //         }
        //     },
        //     'awesome-typescript-loader'
        //     ]
        // },
        {
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
                use: [
                    "css-loader",
                    {
                        loader: "postcss-loader",
                        options:{
                            config: {
                                path: path.resolve(__dirname, "../", "build/postcss.config.js")
                            }
                        }
                    }
                ],
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
        extensions: ['.js', '.jsx', '.css', '.scss', '.tsx', 'ts'],
        alias: {
            $redux: path.resolve(__dirname, '../', 'public/src/redux'),
            $apis: path.resolve(__dirname, '../', 'public/src/apis'),
            $components: path.resolve(__dirname, '../', 'public/src/components'),
            $routes: path.resolve(__dirname, '../', 'public/src/routes'),
            $styles: path.resolve(__dirname, '../', 'public/src/styles'),
            $helper: path.resolve(__dirname, '../', 'public/src/helper'),
            $utils: path.resolve(__dirname, '../', 'public/src/utils'),
            $actions: path.resolve(__dirname, '../', 'public/src/actions'),
            $views: path.resolve(__dirname, '../', 'public/src/views'),
        }
    },
    externals: {
        wangeditor: 'wangeditor'
    },
    plugins: [
        new BundleAnalyzerPlugin({
            analyzerPort: 4455
        }),
        new CleanWebpackPlugin(['dist'],　 //匹配删除的文件
        {
            root: path.resolve(__dirname, '../', 'public'),//根目录
            verbose:  true,        　　　　　　　　　　//开启在控制台输出信息
            dry:      false        　　　　　　　　　　//启用删除文件
        }),
        new LodashModuleReplacementPlugin,
        // 压缩配置
        new webpack.optimize.UglifyJsPlugin(
            {
                sourceMap: true
            }
        ),
        new webpack.optimize.CommonsChunkPlugin({
            name: "vendors",
            filename: "vendors.[hash:6].js",
        }),
        htmlWebpackPluginIndex,
        htmlWebpackPluginLogin,
        //将模块暴露到全局去
        // new webpack.ProvidePlugin({
        //     $: 'jquery',
        //     Immutable:'immutable'
        // }),
        new ExtractTextPlugin("styles/[name].css"),
        new TsConfigPathsPlugin({
            configFileName: "tsconfig.json",
            compiler: "typescript"
        }),
        //  scope hoisting
        new webpack.optimize.ModuleConcatenationPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                 'NODE_ENV': JSON.stringify('production')
            },
            __VERSION__: JSON.stringify(version),
            __DEV__: env === 'development',
            __PROD__: env === 'production',
            __WHY_DID_YOU_UPDATE__: true  //是否检测不必要的组件重渲染
          }),
    ]
}
