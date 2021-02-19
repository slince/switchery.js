const path = require('path');
const {merge} = require('webpack-merge');
const config = require('./webpack.base');

module.exports = merge(config, {
    mode: 'development',
    output: {
        publicPath: "http://127.0.0.1:3001/"
    },
    devServer: {
        contentBase: path.resolve(__dirname, '../dist'),
        host: '0.0.0.0',
        hot: true,
        port: 3001,
        headers: { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Credentials": true }
    }
});
