import express from 'express'
import ip from 'ip'

import fs from 'fs'

import lowdb from 'lowdb'
import fileAsync from 'lowdb/lib/file-async'
import underscoreDb from 'underscore-db'

import config from '../config'

const app = express()
export default app
app.listen(config.backendServerPort, function () {
    process.stdout.clearLine()
    process.stdout.cursorTo(0)
    console.log(`bkd-server at http://${ip.address()}:${this.address().port}`)
})
// export default bkdServer

// console.log(default.address())

// API router
export const apiRouter = express.Router()
app.use('/api', apiRouter)

// IMG router
export const imgRouter = express.Router()
app.use('/img', imgRouter)

// 遍历目录并执行文件，你不再需要在手动引入
const walkDirAndRequire = function (dir, router) {
    try {
        let hasIndexJs = false, hasDbJson = false
        fs.readdirSync(dir).forEach((fname) => {
            const path = `${dir}/${fname}`
            if (fs.statSync(path).isDirectory()) {
                walkDirAndRequire(path, router)
            } else if (fname === 'index.js') {
                hasIndexJs = true
            } else if (fname === 'db.json') {
                hasDbJson = true
            }
        })
        
        if (hasIndexJs) {
            let db // 数据库
            if (hasDbJson) {
                db = lowdb(`${dir}/db.json`, {
                    storage: fileAsync
                })
            } else {
                db = lowdb() // 基于内存的DB
            }
            db._.mixin(underscoreDb)
            require(`${dir}/index`).default(router, db)
        }
    } catch (err) {
        console.log(err)
    }
}
walkDirAndRequire(`${__dirname}/api`, apiRouter)
// walkDirAndRequire(`${__dirname}/img`, imgRouter)
