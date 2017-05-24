var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require("path");
module.exports = {
    entry: {
        index:[
            path.resolve(__dirname, "public/src/index.js")
        ],
        // test:[
        //     path.resolve(__dirname, "public/src/components/Test.js")
        // ]
    },
    output: {
        path: path.resolve(__dirname, 'public/dist/'),
        filename: "[name].js"
    },
    module: {
        loaders: [
            {
                test: /\.js[x]?$/,
                loader: 'babel',
                include: [path.resolve(__dirname, 'public/src')],
                exclude: /node_modules/
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
        //将模块暴露到全局去
        new webpack.ProvidePlugin({
            $:'jquery'
        }),
        new ExtractTextPlugin("./styles/style.css")
    ],
    devtool: 'source-map'
}
