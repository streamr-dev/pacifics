
// Starter kit needs Node version >= 6.0.0
if (process.version.split(/v|\./)[1] < 6) {
    console.error(`Node version must be v6.0.0 or newer. Version ${process.version} detected. Exiting.`)
    process.exit(1)
}

// Argument manager
const yargs = require('yargs')

const express = require('express')
const logger = require('morgan')

// Bundling and dev server
const webpack = require('webpack')
const webpackMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const session = require('express-session')
const underscoreExpress = require('underscore-express')
const fs = require('fs')
const path = require('path')

const app = express()
app.use(logger('dev'))

underscoreExpress(app, 'tmpl')
app.set('view engine', 'tmpl')

app.set('views', path.resolve(__dirname, 'views'))

// By default, react app is compiled into this location
app.use(express.static('public'))

// Initialize the database connection
const connection = require('./database/connection')
connection.testConnection()
connection.initDependencies()

const passport = require('./passport/init-passport')
app.use(session({
    secret: 'YOU REALLY SHOULD FIND A NEW GROUND-BREAKING SECRET HERE',
    resave: true,
    saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())

const inProduction = process.env.NODE_ENV === 'production'

const webpackProdConfig = require('./webpack.prod.config')
const webpackDevConfig = require('./webpack.dev.config')

try {
    fs.accessSync(path.resolve(webpackProdConfig.output.path, webpackProdConfig.output.filename), fs.F_OK)
    if (!inProduction) {
        console.warn(`\n\tOld javascript bundle found from ${webpackProdConfig.output.path}/${webpackProdConfig.output.filename}.` +
            '\n\tIf not removed, it will override the in-memory bundle created by webpack-dev-server.\n')
    }
// When the bundle was not found
} catch (e) {
    if (inProduction) {
        if (e.code === 'ENOENT') {
            console.error('\n\tJavascript bundle not found! You must run \'npm run build\' before starting in production environment.\n')
            process.exit(1)
        }
        throw e
    }
}

// Set up dev server
if (!inProduction) {
    const compiler = webpack(webpackDevConfig)
    app.use(webpackMiddleware(compiler))
    app.use(webpackHotMiddleware(compiler))
}

// Set base url
app.locals = {
    baseUrl: process.env.BASE_URL || ''
}

app.use('/', require('./routes/index'))
app.use('/login', require('./routes/login'))
app.use('/signup', require('./routes/signup'))
app.use('/logout', require('./routes/logout'))


// Error handler, must have 4 args

/* eslint-disable no-unused-vars */
app.use((err, req, res, next) => {
    /* eslint-enable no-unused-vars */
    console.error(err.stack)
    res.status(500)
        .send({
            error: err.message
        })
})

const port = parseFloat(yargs.argv.port) || process.env.PORT || 3000
app.listen(port, function() {
    console.info(`App started in port ${port}!`)
})
