const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const devMode = process.env.NODE_ENV === 'development';

const config = {
    mode: process.env.NODE_ENV,
    entry: {
        'quickview': basePath + '/src/app.jsx'
    },
    output: {
        filename: devMode ? 'js/[name].js' : 'js/[name].[contenthash].js',
        path: basePath + '/dist',
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: devMode ? 'css/[name].css' : 'css/[name].[contenthash].css',
            chunkFilename: devMode ? 'css/[id].css' : 'css/[id].[contenthash].css',
        }),
        new webpack.ProvidePlugin({
            '$': 'jquery',
            'jQuery': 'jquery',
        }),
        new CleanWebpackPlugin({
            dry: false,
            verbose: true,
            cleanStaleWebpackAssets: false,
            protectWebpackAssets: false,
        })
    ],
    module: {
        rules: [
            {
                test: /\.(css|scss|sass)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1
                        }
                    },
                    "postcss-loader",
                    "sass-loader"
                ]
            },
            {
                test: /\.svg$/,
                loader: 'raw-loader'
            },
            {
                test: /\.(png|jpg|bmp|gif|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            esModule: false
                        }
                    }
                ]
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
            },
            {
                test: /\.(njk|nunjucks|twig)$/,
                loader: 'nunjucks-loader'
            }
        ]
    }
};
module.exports = config;