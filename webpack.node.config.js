var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require("path");
module.exports = {
    entry: {
        index:[
            path.resolve(__dirname, "routes/index.js")
        ]
    },
    output: {
        // path: path.resolve(__dirname, 'public/dist/'),
        filename: "[name].dev.js"
    },
    module: {
        loaders: [
            {
                test: /\.js[x]?$/,
                loader: 'babel',
                include: [path.resolve(__dirname, 'public/src')],
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {

        }
    },

    devtool: 'source-map'
}
