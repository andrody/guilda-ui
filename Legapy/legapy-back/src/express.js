const path = require('path')
const bodyParser = require('body-parser')
const compression = require('compression')
const expressLogger = require('morgan')
const database = require('./config/database/index')
const routesSetup = require('./routes/api.js')
const passport = require('passport')
const expressErrorHandler = require('./modules/expressErrorHandler')
const cors = require('cors')

module.exports = async (app, express, dirname) => {
    /*
     * Setup Database
     */

    await database.init()

    /*
     * Basic Middlewares
     */

    app
        .use(cors())
        .use(compression())
        .use(express.static(path.join(dirname, 'public')))
        .use(expressLogger('dev'))
        .use(bodyParser.urlencoded({ extended: false }))
        .use(bodyParser.json({}))
        .use(bodyParser.text({}))
        .use(bodyParser.raw({}))

    /*
    * API ROUTES
    */

    const apiRouter = routesSetup(app, express, passport)
    console.log('[Carregando rotas]')
    app.use('/api', apiRouter)

    /**
     * Error handler
     */

    app.use(expressErrorHandler(app))

    /**
     * Replacer undefined to null
     */
    app.set('json replacer', (key, value) => {
        // undefined values are set to `null`
        if (typeof value === 'undefined') {
            return null
        }
        return value
    })

    app.use(expressErrorHandler(app))

    /*
     * PAGE ROUTES
     */
    app.use((req, res) =>
        res.status(404).send('Service Works. Try our api: domain/api'),
    )

    process.on('unhandledRejection', (error) => {
        // Will print "unhandledRejection err is not defined"
        console.log('unhandledRejection', error.message)
    })
}
