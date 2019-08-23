const SubscriptionController = require('../controllers/SubscriptionController')
const authorizate = require('../security/authentication').authorizate
const sequelize = require('../config/database/sequelize')
const pagination = require('../middlewares/pagination')

module.exports = (app, express) => {
    const subscriptionController = new SubscriptionController(sequelize)
    const apiRouter = express.Router()

    /*
     *  Get Subscriptions
     */
    apiRouter.route('/')
        .get(authorizate(), (req, res, next) => {
            subscriptionController.get(req.currentUser, (err, message, data, status = 200) => {
                if (err) return next(err)
                return res.status(status).json({ message, data })
            })
        })

    /*
     *  Create Subscription
     */
    apiRouter.route('/')
        .post(authorizate(), (req, res, next) => {
            subscriptionController.create(req.currentUser, req.body, (err, message, data, status = 200) => {
                if (err) return next(err)
                return res.status(status).json({ message, data })
            })
        })

    /*
     *  Create Subscription
     */
    apiRouter.route('/:IDSubscription')
        .post(authorizate(), (req, res, next) => {
            subscriptionController.update(req.params.IDSubscription, req.body, (err, message, data, status = 200) => {
                if (err) return next(err)
                return res.status(status).json({ message, data })
            })
        })


    /*
    *  Delete Subscription
    */
    apiRouter.route('/:IDSubscription')
        .delete(authorizate(), (req, res, next) => {
            subscriptionController.delete(req.params.IDSubscription, (err, message, data, status = 200) => {
                if (err) return next(err)
                return res.status(status).json({ message, data })
            })
        })


    return apiRouter
}
