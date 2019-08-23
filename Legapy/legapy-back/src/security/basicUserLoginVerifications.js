const AuthError = require('../errors/CustomError')
const ValidationError = require('../errors/CustomError')
const ErrorCode = require('../auxiliary/ErrorCodes')
const sequelize = require('../config/database/sequelize')
const Models = require('../config/database/models')
const check = require('../auxiliary/Validator').check

module.exports = () => {
    const UserModel = sequelize.getModel('Users')

    return async (req, res, next) => {
        try {
            const login = req.body.Email
            const password = req.body.Password

            check(login, 'El email se requiere').required().isString({ min: 1 })
            check(password, 'El password se requiere').required().isString({ min: 1 })

            const user = await UserModel.findOne({
                where: { Email: login },
            })

            check(user, ErrorCode.USER_NOT_FOUND, 'Usuário não encontrado').required()

            req.user = user

            return next()
        } catch (err) {
            return next(err)
        }
        // return res.status(200).send(user)
    }
}
