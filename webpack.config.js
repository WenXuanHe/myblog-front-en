var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require("path");
module.exports = {
    entry: {
        index:[
            path.resolve(__dirname, "public/src/index.js")
        ]
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
    plugins:[
        //将模块暴露到全局去
        new webpack.ProvidePlugin({
            $:'jquery'
        }),
        new ExtractTextPlugin("./styles/style.css")
    ],
    devtool: 'source-map'
}
