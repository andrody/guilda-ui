const userRoutes = require('./UserRoutes')
const categoryRoutes = require('./CategoryRoutes')
const bookRoutes = require('./BookRoutes')
const subscriptionsRoutes = require('./SubscriptionRoutes')
const commentRoutes = require('./CommentRoutes')

module.exports = (app, express) => {
    const apiRouter = express.Router()

    apiRouter.use('/users', userRoutes(app, express))
    apiRouter.use('/categories', categoryRoutes(app, express))
    apiRouter.use('/books', commentRoutes(app, express))
    apiRouter.use('/books', bookRoutes(app, express))
    apiRouter.use('/subscriptions', subscriptionsRoutes(app, express))

    return apiRouter
}
