import webpack from 'webpack'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'

import eslintFriendlyFormatter from 'eslint-friendly-formatter'

import autoprefixer from 'autoprefixer'
import postcssPxtorem from 'postcss-pxtorem'

export default {
    entry: {
        vendor: ['vue', 'vue-router', 'vuex', 'vuex-router-sync'],
        vx: [
            'webpack-hot-middleware/client?noInfo=true&reload=true',
            // './src/assets/fonts/iconfont.scss',
            './src/main.js'
        ]/*,
        app: [
            'webpack-hot-middleware/client?noInfo=true&reload=true',
            './src/main.js'
        ]*/
    },
    devtool: '#cheap-module-source-map',
    // devtool: '#eval-source-map',
    // devtool: 'inline-source-map',
    // devtool: 'source-map',
    output: {
        path: `${__dirname}/www`,
        // path: './www',
        publicPath: '/',
        filename: '[name].bundle.js'
    },
    resolve: {
        extensions: ['', '.js', '.vue'],
        alias: {
            'assets': `${__dirname}/src/assets`,
            'components': `${__dirname}/src/components`
        }
    },
    module: {
        preLoaders: [{
            test: /\.(vue|js)$/,
            exclude: /node_modules/,
            loader: 'eslint'
        }],
        
        loaders: [{
            test: /\.vue$/,
            exclude: /node_modules/,
            loader: 'vue'
        }, {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'monkey-hot'
        }, {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel'
        }, {
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            loader: 'url',
            query: {
                limit: 10000,
                name: 'img/[name].[ext]?[hash:7]'
            }
        }, {
            test: /\.(woff2?|eot|ttf|otf)(\?.*)?|iconfont.svg$/,
            loader: 'url',
            query: {
                limit: 10000,
                name: 'fonts/[name].[ext]?[hash:7]'
            }
        }/*, {
            test: /\.scss$/,
            loader: 'vue-style-loader!css-loader?sourceMap!postcss-loader!sass-loader?sourceMap'
        }*/]
    },
    /*postcss: function() {
        return [
            autoprefixer({
                browsers: ['last 2 versions', 'iOS >= 7', 'Android >= 4']
            }),
            // https://github.com/cuth/postcss-pxtorem
            postcssPxtorem({
                rootValue: 100,
                unitPrecision: 5,
                propWhiteList: [],
                selectorBlackList: [], 
                replace: true,
                mediaQuery: false,
                minPixelValue: 0
            })
        ];
    },*/
    eslint: {
        formatter: eslintFriendlyFormatter
    },
    vue: {
        postcss: [
            autoprefixer({
                browsers: ['last 2 versions', 'iOS >= 7', 'Android >= 4']
            }),
            /*require('cssnano')({ // just used in production
                safe: true
            }),*/
            require('css-mqpacker')(),
            // 肯定最好是用postcss，flexible布局生成了太多的[dpr-*]样式，所以作为实验暂时先不考虑用了，用pxtorem代替（注意：不同于px2rem）
            // https://github.com/cuth/postcss-pxtorem
            postcssPxtorem({
                rootValue: 100,
                unitPrecision: 5,
                propWhiteList: [],
                selectorBlackList: [], 
                replace: true,
                mediaQuery: false,
                minPixelValue: 0
            }),
        ],
        loaders: {
            sass: 'vue-style-loader!css-loader?sourceMap!sass-loader?sourceMap'
        }
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),

        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: '[name].bundle.js',
            minChunks: Infinity // 不需要抽取公共代码到这个文件中，因为目前我们的bundle只有一个
        }),
        // new webpack.optimize.DedupePlugin(),
        // https://github.com/ampedandwired/html-webpack-plugin
        new HtmlWebpackPlugin({
            chunks: ['vendor', 'vx'],
            filename: 'index.html',
            template: 'site/template/vx-flex.html',
            inject: true
        })
    ]
};
