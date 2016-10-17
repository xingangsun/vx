import nodemon from 'nodemon'

nodemon({
    script: `${__dirname}/app.js`,
    watch: [`${__dirname}/api`, `${__dirname}/img`],
    ext: 'js json',
    execMap: {
        'js': 'babel-node'
    }
}).on('crash', function () {
    console.error('nodemon crashed!')
    setTimeout(() => {
        process.exit(0)
    }, 0)
}).on('quit', function() {
    process.kill(process.pid)
}).on('restart', function (files) {
    process.stdout.clearLine()
    process.stdout.cursorTo(0)
    process.stdout.write(`bkd-server restarting due to [${files.map(file => file.replace(`${__dirname}/`, ''))}]`)
})
