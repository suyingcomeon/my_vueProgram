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
    resolve: {
        extensions: ['.js', '.vue', '.json'],//自动解析后缀
        alias: {
            'vue$': 'vue/dist/vue.esm.js',//webpack 的vue必须要加上这个
        }
    },
    plugins: []
}

function getEntry (globPath, pathDir) {
    var files = glob.sync(globPath);
    var entries = {},
    dirname,basename,extname,chunks;
    files.forEach((entry) => {
        console.log(entry)
        console.log(3445)
        dirname = path.dirname(entry);
        basename = /apps\/(.*)\/index\.js/.exec(entry)[1];
        entries[basename] = entry;
        const plug = new HtmlWebpackPlugin({
            filename: `${__dirname}/dist/${basename}.html`,
            chunks,
            template: `${dirname}/index.html`,
            inject: true
        })
        config.plugins.push(plug);
    })
    console.log(78)
    console.log(entries)
    return entries;
}

const newEntries = getEntry('./src/apps/*/index.js');

if(env === 'production') {//生产环境
    config.entry = {
        vender: ['vue', 'vue-router', 'vuex']//公用方法
    },
    config.plugins = config.plugins.concat([
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor']
        })
    ])
    new ExtractTextPlugin({
        filename:(getPath) => {
            return getPath('[name].[hash].css')
        }
    })//分离css
} else {
    config.devtool = 'source-map';
    config.devServer = {
        historyApiFallback: true,//不跳转
        inline: true,//时时刷新
        hot: true,//热加载
        port: 9010
    }
    config.plugins = config.plugins.concat([
        new webpack.HotModuleReplacementPlugin(),
    ])
}
config.entry = Object.assign({}, config.entry, newEntries);
module.exports = config;