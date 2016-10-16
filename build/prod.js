import webpack from 'webpack'

import webpackConfig from './webpack.config.prod.babel'

webpack(webpackConfig, function (err, stats) {
    if (err) {
        throw err
    }
    process.stdout.clearLine()
    process.stdout.cursorTo(0)
    console.log(stats.toString({
        colors: true,
        hash: false,
        version: true,
        timings: true,
        assets: true,
        chunks: false,
        children: false
    }))
})
/*const devMiddleware = webpackDevMiddleware(webpackCompiler, {
    publicPath: webpackCompiler.options.output.publicPath,
    noInfo: true,
    quiet: false,
    stats: {
        colors: true,
        hash: false,
        version: false,
        timings: false,
        assets: false,
        chunks: false,
        children: false
    }
})*/
