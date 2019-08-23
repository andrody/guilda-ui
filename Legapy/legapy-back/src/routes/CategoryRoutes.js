const CategoryController = require('../controllers/CategoryController')
const authorizate = require('../security/authentication').authorizate
const sequelize = require('../config/database/sequelize')

module.exports = (app, express) => {
    const categoryController = new CategoryController(sequelize)
    const apiRouter = express.Router()

    /*
     *  Get Categories
     */
    apiRouter.route('/')
        .get((req, res, next) => {
            categoryController.get(req.query, (err, message, data, status = 200) => {
                if (err) return next(err)
                return res.status(status).json({ message, data })
            })
        })

    /*
     *  Get Updated
     */
    apiRouter.route('/updates')
        .get((req, res, next) => {
            categoryController.getLastUpdate((err, message, data, status = 200) => {
                if (err) return next(err)
                return res.status(status).json({ message, data })
            })
        })

    /*
     *  Create Category
     */
    apiRouter.route('/')
        .post(authorizate({ admin: true }), (req, res, next) => {
            categoryController.create(req.body, (err, message, data, status = 200) => {
                if (err) return next(err)
                return res.status(status).json({ message, data })
            })
        })

    /*
     *  Update Category
     */
    apiRouter.route('/:categoryID')
        .put(authorizate({ admin: true }), (req, res, next) => {
            categoryController.update(req.params.categoryID, req.body, (err, message, data, status = 200) => {
                if (err) return next(err)
                return res.status(status).json({ message, data })
            })
        })

    /*
     *  Delete Category
     */
    apiRouter.route('/:categoryID')
        .delete(authorizate({ admin: true }), (req, res, next) => {
            categoryController.delete(req.params.categoryID, (err, message, data, status = 200) => {
                if (err) return next(err)
                return res.status(status).json({ message, data })
            })
        })

    return apiRouter
}
