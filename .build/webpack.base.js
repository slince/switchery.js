const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const basePath = path.resolve(__dirname, "../");

const config = {
    mode: process.env.NODE_ENV,
    entry: {
        'switchery': basePath + '/src/index.js',
        'example': basePath + '/example/example.js'
    },
    output: {
        filename: '[name].min.js',
        path: basePath + '/dist',
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: basePath + '/example/index.html',
            filename: basePath + '/dist/index.html'
        }),
        new MiniCssExtractPlugin({
            filename: '[name].min.css',
            chunkFilename: '[id].min.css'
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