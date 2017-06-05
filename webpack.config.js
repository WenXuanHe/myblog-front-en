var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require("path");
var routeComponentRegex = /public\/src\/([^\/]+\/?[^\/]+).js$/;

var publicPath = '/dist/';

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
        publicPath:publicPath
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
                    ]
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
                loader: ExtractTextPlugin.extract(['css'])
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract(['css','sass'])
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
            $helper: path.resolve(__dirname, 'public/src/helper')
        }
    },
    plugins:[
        new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),
        //将模块暴露到全局去
        new webpack.ProvidePlugin({
            $:'jquery'
        }),
        new ExtractTextPlugin("./styles/style.css")
        
    ],
    devtool: 'source-map'
}
