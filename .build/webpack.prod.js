const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const {merge} = require('webpack-merge');
const config = require('./webpack.base');

module.exports = merge(config, {
    mode: 'production',
    output: {
        publicPath: "./",
        library: 'Switchery',
        libraryTarget: 'umd',
    },
    plugins: [
        new CleanWebpackPlugin({
            dry: false,
            verbose: true
        }),
    ]
});
