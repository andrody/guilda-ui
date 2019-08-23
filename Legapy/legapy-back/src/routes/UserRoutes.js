const UserController = require('../controllers/UserController')
const basicUserValidations = require('../security/basicUserLoginVerifications')
const authorizate = require('../security/authentication').authorizate
const sequelize = require('../config/database/sequelize')
const generateTokenForUser = require('../security/authentication').generateLoginToken

module.exports = (app, express) => {
    const userController = new UserController(sequelize, generateTokenForUser)
    const apiRouter = express.Router()

    /*
     *  Login
     */
    apiRouter.route('/login')
        .post(basicUserValidations(), (req, res, next) => {
            userController.login(req.user, req.body.Password, (err, message, data, status = 200) => {
                if (err) return next(err)

                return res.status(status).json({ message, data })
            })
        })

    /*
     *  Cadastro
     */
    apiRouter.route('/')
        .post((req, res, next) => {
            userController.register(req.body, (err, message, data, status = 200) => {
                if (err) return next(err)
                return res.status(status).json({ message, data })
            })
        })
    /*
     *  Update
     */
    apiRouter.route('/:userID')
        .put((req, res, next) => {
            userController.update(req.params.userID, req.body, (err, message, data, status = 200) => {
                if (err) return next(err)
                return res.status(status).json({ message, data })
            })
        })

    /*
     *  Get All Users
     */
    apiRouter.route('/')
        .get(authorizate(), (req, res, next) => {
            userController.getUsers((err, message, data, status = 200) => {
                if (err) return next(err)
                return res.status(status).json({ message, data })
            })
        })

    /*
     *  Change password
     */
    apiRouter.route('/change-password')
        .post(authorizate({ getUser: true }), (req, res, next) => {
            const body = {
                user: req.user,
                Password: req.body.Password,
                NewPassword: req.body.NewPassword,
                RepeatedPassword: req.body.RepeatedPassword,
            }

            userController.changePassword({ ...body }, (err, message, data, status = 200) => {
                if (err) return next(err)
                return res.status(status).send({ message, data })
            })
        })

    /*
    *  Forgot password
    */
    apiRouter.route('/forgot-password')
        .post((req, res, next) => {
            userController.forgotPassword(req.body.Email, (err, message, data, status = 200) => {
                if (err) return next(err)
                return res.status(status).send({ message, data })
            })
        })

    /*
    *  Reset password
    */
    apiRouter.route('/reset-password')
        .post((req, res, next) => {
            userController.resetPassword({ ...req.body }, (err, message, data, status = 200) => {
                if (err) return next(err)
                return res.status(status).send({ message, data })
            })
        })

    /*
    *  Send Email Support
    */
    apiRouter.route('/support')
        .post((req, res, next) => {
            userController.sendSupportEmail({ ...req.body }, (err, message, data, status = 200) => {
                if (err) return next(err)
                return res.status(status).send({ message, data })
            })
        })

    return apiRouter
}
