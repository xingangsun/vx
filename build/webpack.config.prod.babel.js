import webpack from 'webpack'
import ExtractTextPlugin from 'extract-text-webpack-plugin'

export default {
    // debug: false,
    entry: {
        // polyfill: [''],
        // vendor: ['vue', 'vue-router', 'vuex', 'vuex-router-sync'],
        app: [
            './src/main.js'
        ]
    },
    // devtool: '#source-map',
    devtool: false,
    output: {
        path: __dirname + '/www',
        publicPath: '/assets/',
        filename: '[name].[chunkhash].js',
        chunkFilename: '[id].[chunkhash].js'
    },
    module: {
        preLoaders: [{
            test: /\.(vue|js)$/,
            exclude: /node_modules/,
            loader: 'eslint',
            query: {
                cache: true
            }
        }],
        loaders: [{
            test: /\.vue$/,
            exclude: /node_modules/,
            loader: 'vue'
        }, {
            test: /\.js$/,
            exclude: /node_modules/,
            loaders: 'babel',
            query: {
                cacheDirectory: true
            }
        }, {
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            loader: 'url',
            query: {
                limit: 10000,
                name: 'img/[name].[ext]?[hash:7]'
            }
        }, {
            test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
            loader: 'url',
            query: {
                limit: 10000,
                name: 'fonts/[name].[ext]?[hash:7]'
            }
        }]
    },
    vue: {
        autoprefixer: {
            browsers: ['last 2 versions', 'iOS >= 7', 'Android >= 4']
        },
        // postcss: [],
        loaders: {
            sass: ExtractTextPlugin.extract({
                loader: [
                    'css',
                    'px2rem?' + JSON.stringify({
                        remUnit: 24, // set `rem` unit value (default: 75)
                        threeVersion: true, // whether to generate @1x, @2x and @3x version stylesheet (default: false)
                        remVersion: true, // whether to generate rem version stylesheet (default: true)
                        baseDpr: 1, // set base device pixel ratio (default: 2)
                        remPrecision: 6 // set rem value precision (default: 6)
                    }),
                    'sass'
                ].join('!'))
            })
        }
    },
    plugins: [
        // http://vue-loader.vuejs.org/en/workflow/production.html
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),

        // new webpack.optimize.DedupePlugin(),
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
            },
            sourceMap: false
        }),
        // https://github.com/webpack/extract-text-webpack-plugin
        new ExtractTextPlugin({
            filename: 'css/[name].[contentHash].css',
            allChunks: false,
            disable: false
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: 'vendor.bundle.js'
        }),
        // new webpack.optimize.DedupePlugin(),
        // https://github.com/ampedandwired/html-webpack-plugin
        new HtmlWebpackPlugin({
            chunks: ['polyfill', 'vendor', 'app'],
            filename: 'dist/index.html',
            template: 'index.html',
            inject: true,
            minify: {
                collapseWhitespace: true,
                removeComments: true,
                minifyCSS: true,
                minifyJS: true
            }
        })
    ]
};
