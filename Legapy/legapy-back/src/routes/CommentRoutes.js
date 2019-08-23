const CommentController = require('../controllers/CommentController')
const authorizate = require('../security/authentication').authorizate
const sequelize = require('../config/database/sequelize')
const pagination = require('../middlewares/pagination')

module.exports = (app, express) => {
    const commentController = new CommentController(sequelize)
    const apiRouter = express.Router()

    /*
     *  Get Comments
     */
    apiRouter.route('/:IDBook/comments')
        .get(authorizate(), pagination(), (req, res, next) => {
            commentController.get(req.params, req.currentUser, (err, message, data, status = 200) => {
                if (err) return next(err)
                return res.status(status).json({ message, data })
            })
        })

    /*
     *  Create Comment
     */
    apiRouter.route('/:IDBook/comments')
        .post(authorizate(), (req, res, next) => {
            commentController.create(req.currentUser, req.body, (err, message, data, status = 200) => {
                if (err) return next(err)
                return res.status(status).json({ message, data })
            })
        })


    /*
    *  Delete Favorite
    */
    apiRouter.route('/:IDBook/comments/:IDComment')
        .delete(authorizate(), (req, res, next) => {
            commentController.delete(req.params.IDComment, (err, message, data, status = 200) => {
                if (err) return next(err)
                return res.status(status).json({ message, data })
            })
        })


    return apiRouter
}
