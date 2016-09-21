import gulp from 'gulp'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'

import browserSync from 'browser-sync'

import webpackConfig from './build/webpack.config.dev.babel.js'

const server = (done) => {
    let webpackComplier = webpack(webpackConfig),
        hotMiddleware = webpackHotMiddleware(webpackComplier),
        devMiddleware = webpackDevMiddleware(webpackComplier, {
            noInfo: false,
            publicPath: webpackConfig.output.publicPath,
            stats: {
                colors: true,
                hash: false,
                version: false,
                timings: false,
                assets: true,
                chunks: false
            }
        }),

        bsServer = browserSync.create('dev-server')
    
    bsServer.init({
        browser: ['google chrome'],
        // port: 3000,
        open: false,
        notify: false,
        reloadOnRestart: true,
        logFileChanges: true,
        server: {
            baseDir: 'www',
            directory: true
        },
        files: ['www'],
        middleware: [devMiddleware, hotMiddleware]
    })
}

export { server }

export default function(done) {
    
}


