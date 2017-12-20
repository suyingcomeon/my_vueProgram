const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');//生成html模板
const ExtractTextPlugin = require('extract-text-webpack-plugin'); //提出css
const glob = require('glob'); //循环所有文件
const env = process.env.NODE_ENV //当前环境

const config = {
    entry: {},
    output: {
        path: `${__dirname}/dist`,
        filename: '[name]-[hash].js'
    },
    module: {
        rules: [
            {
                test: /\.jxs|.js/,
                use: {
                    loader: 'babel-loader',
                },
                exclude: /node_modules/
            },
            {
                test: /(\.vue$)/,
                use: {
                    loader: 'vue-loader',
                }
            },
            {
                test: /\.(css|scss)$/,
                use: env === 'production'
                    ? ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: ['css-loader', 'postcss-loader']
                    })
                    : ['style-loader?sourceMap', 'css-loader?sourceMap', 'postcss-loader?sourceMap']
            },
            {
                test: /\.(png|jpg|gif)\$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            name: 'images/[name].[ext]',
                            //publicPath:'../../'  //相对地址
                        }
                    }
                ]        
            }
        ]
    },
    resole
}