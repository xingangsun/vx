import express from 'express'
import ip from 'ip'

import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'

import config from '../config'
import webpackConfig from './webpack.config.dev.babel'

const webpackCompiler = webpack(webpackConfig)
const devMiddleware = webpackDevMiddleware(webpackCompiler, {
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
})
const hotMiddleware = webpackHotMiddleware(webpackCompiler, {
    log: false
})

const devServer = express()

devServer.use(devMiddleware)
devServer.use(hotMiddleware)

devServer.listen(config.devServerPort, function () {
    process.stdout.clearLine()
    process.stdout.cursorTo(0)
    console.log(`dev-server at http://${ip.address()}:${this.address().port}`)
})
