var webpack = require('webpack');
var fs = require('fs');
var path = require('path');
var nodeModules = {};
fs.readdirSync('node_modules')
    .filter(function(x) {
        return ['.bin'].indexOf(x) === -1;
    })
    .forEach(function(mod) {
        nodeModules[mod] = 'commonjs ' + mod;
    });

module.exports = {
    entry: [
        'webpack/hot/poll?1000',
        './bin/www'
    ],
    output: {
        filename: 'server.js',
        libraryTarget: 'commonjs2'
    },
    target: 'node',
    externals: nodeModules,
    context: __dirname,
    node: {
        __filename: false,
        __dirname: false
    },
    module: {
        loaders: [{
            test: /\.js$/,
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
            exclude: [
                path.resolve(__dirname, "node_modules"),
            ]
        },{
            test: /\.tsx?$/,
            use: [ 'awesome-typescript-loader']
        },{
            test: /\.json$/,
            loader: 'json-loader'
        }]
    },
    resolve: {
        extensions: ['.js', '.tsx', 'ts'],
        alias: {
            $redux: path.resolve(__dirname, 'public/src/redux'),
            $apis: path.resolve(__dirname, 'public/src/apis'),
            $components: path.resolve(__dirname, 'public/src/components'),
            $routes: path.resolve(__dirname, 'public/src/routes'),
            $styles: path.resolve(__dirname, 'public/src/styles'),
            $helper: path.resolve(__dirname, 'public/src/helper'),
            $utils: path.resolve(__dirname, 'public/src/utils'),
            $actions: path.resolve(__dirname, 'public/src/actions'),
            $views: path.resolve(__dirname, 'public/src/views'),
        }
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
}