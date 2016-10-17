import sampleConfig from './sample'
import fs from 'fs'

let mineConfig
try {
    fs.accessSync(`${__dirname}/mine.js`)
    mineConfig = require('./mine').default
} catch (err) {
    mineConfig = {}
}

export default Object.assign({}, sampleConfig, mineConfig)
