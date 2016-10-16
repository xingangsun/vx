import webpack from 'webpack'
import ProgressBarPlugin from 'progress-bar-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'

import eslintFriendlyFormatter from 'eslint-friendly-formatter'

import autoprefixer from 'autoprefixer'
import postcssPxtorem from 'postcss-pxtorem'

// https://github.com/cssmagic/blog/issues/58
export default {
    entry: {
        vendor: ['vue', 'vue-router', 'vuex', 'vuex-router-sync'],
        vx: [
            'webpack-hot-middleware/client?noInfo=true&reload=true',
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
        path: __dirname + '/www',
        // path: './www',
        publicPath: '',
        filename: 'js/[name].bundle.js'
    },
    resolve: {
        extensions: ['.js', '.vue'],
        alias: {
            assets: `${__dirname}/src/assets`,
            components: `${__dirname}/src/components`
        }
    },
    module: {
        loaders: [{
            enforce: 'pre',
            test: /\.(vue|js)$/,
            exclude: /node_modules/,
            loader: 'eslint'
        },{
            test: /\.vue$/,
            exclude: /node_modules/,
            loader: 'vue'/*,
            options: {
                loaders: {
                    // sass: 'vue-style-loader?sourceMap!css-loader?sourceMap!sass-loader?sourceMap'
                    // sass: 'vue-style-loader!css-loader?sourceMap!sass-loader?sourceMap'
                    sass: 'css-loader?sourceMap!sass-loader?sourceMap'
                },
                cssSourceMap: true
            }*/
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
                name: 'img/[name].[ext]'
            }
        }, {
            test: /\.(woff2?|eot|ttf|otf)(\?.*)?|iconfont.svg$/,
            loader: 'url',
            query: {
                limit: 10000,
                name: 'fonts/[name].[ext]'
            }
        }]
    },
    plugins: [
        new ProgressBarPlugin({
            format: '[:bar] :percent (:elapseds) :msg',
            clear: true,
            summary: false,
            summaryContent: false,
            customSummary (buildTime) {
                process.stdout.write(`built in ${buildTime}`)
            }
        }),

        new webpack.ProvidePlugin({
            "Vue": 'vue'
        }),
        new webpack.LoaderOptionsPlugin({
            options: {
                eslint: {
                    formatter: eslintFriendlyFormatter
                },
                vue: {
                    postcss: [
                        autoprefixer({
                            browsers: ['last 2 versions', 'iOS >= 7', 'Android >= 4']
                        }),
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
                        })
                    ],
                    loaders: {
                        sass: 'vue-style-loader?sourceMap!css-loader!sass-loader'
                    }
                }
            }
        }),
        // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),

        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: Infinity // 不需要抽取公共代码到这个文件中，因为目前我们的bundle只有一个
        }),
        // https://github.com/ampedandwired/html-webpack-plugin
        new HtmlWebpackPlugin({
            chunks: ['vendor', 'vx'],
            filename: 'index.html',
            template: 'site/template/vx-flex.html',
            // favicon: '',
            inject: true,
            minify: {
                collapseWhitespace: true,
                removeComments: true,
                minifyCSS: true,
                minifyJS: true
            }
        })
    ]
}
