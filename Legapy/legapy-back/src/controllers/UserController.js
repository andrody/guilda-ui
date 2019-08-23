const bcrypt = require('bcrypt')
const AuthError = require('../errors/CustomError')
const ErrorCode = require('../auxiliary/ErrorCodes')
const check = require('../auxiliary/Validator').check
const catcher = require('../auxiliary/Decorators').catcher
const Utils = require('../auxiliary/Utils')

class UserController {
    constructor(sequelize, generateTokenForUser) {
        this.sequelize = sequelize
        this.generateTokenForUser = generateTokenForUser
        this.Users = sequelize.getModel('Users')
    }

    /*
     * Get users
     */
    @catcher
    async getUsers(next) {
        const users = await this.Users.findAll()
        return next(null, 'All users', users)
    }

    /*
     * Register user
     */
    @catcher
    async register({ Email, Password, RepeatedPassword }, next) {
        check(Email, 'El email se requiere').required().isValidString()
        check(Password, 'El password se requiere').required().isString()
            .equals(RepeatedPassword, 'Las contraseñas no coinciden')

        const userExisting = await this.Users.findOne({ where: { Email }, raw: true })
        check(userExisting, 'Email ya registrado').isNull()

        // Encrypt Password
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(Password, salt)

        // Create Usuário
        const newUser = await this.Users.create({
            Email,
            Password: hashPassword,
            Created: new Date(),
        })

        return next(null, 'Usuario creado, por favor inicie sesión', {
            ID: newUser.ID,
            Email: newUser.Email,
            Created: newUser.Created,
        })
    }

    /*
     * Update user
     */
    @catcher
    async update(ID, model, next) {
        const user = await this.Users.findOne({ where: { ID } })
        check(user, 'User not found').required()
        check(model, 'Nothing to update').required()

        await user.update(model)
        return next(null, 'User updated', { ID, ...model })
    }

    /*
     * Login user
     */
    @catcher
    login(user, password, next) {
        let Token = null

        user.validatePassword(password, (err, isCorrect) => {
            if (err) {
                return next(err)
            }

            if (!isCorrect) {
                return next(new AuthError(ErrorCode.INCORRECT_USERNAME_OR_PASSWORD))
            }
            Token = this.generateTokenForUser(user)

            return next(null, 'Usuario conectado', {
                ID: user.ID,
                Email: user.Email,
                Token,
                IsActivated: true,
            })
        })
    }

    /*
     * Change Password
     */
    @catcher
    changePassword({ user, Password, NewPassword, RepeatedPassword }, next) {
        check(Password, 'Se requiere la contraseña').required()
        check(NewPassword, 'Nuevas contraseñas deben ser iguales').required().isString()
            .equals(RepeatedPassword, 'Nuevas contraseñas deben ser iguales')

        user.validatePassword(Password, async (err, isCorrect) => {
            if (err) return next(err)
            if (!isCorrect) return next(new AuthError(ErrorCode.INCORRECT_PASSWORD))

            try {
                const salt = await bcrypt.genSalt(10)
                const hashPassword = await bcrypt.hash(NewPassword, salt)
                const userUpdated = await user.update({
                    Password: hashPassword,
                })
                return next(null, 'Contraseña cambiada', userUpdated)
            } catch (error) {
                return next(error)
            }
        })
    }

    /*
     * Forgot Password
     */
    @catcher
    async forgotPassword(Email, next) {
        check(Email, ErrorCode.MISSING_FIELD, 'Correo electronico es requerido').required().isString()

        const user = await this.Users.findOne({
            where: { Email },
        })
        check(user, ErrorCode.MISSING_FIELD, 'Correo electrónico no registrado').required()

        // Create Token
        const TokenReset = await Utils.randomShortCode()
        await user.update({ TokenReset })

        // Send token to user email
        await Utils.sendEmail({
            to: Email,
            subject: 'Restablecer contraseña | Legapy',
            text: 'Por favor, utilice el siguiente código en el área de reset de la contraseña de su aplicación: ' + TokenReset,
        })

        return next(null, 'Mensage enviada. Verifica tu email')
    }

    /*
     * Reset Password
     */
    @catcher
    async resetPassword({ Email, NewPassword, RepeatedPassword, TokenReset }, next) {
        check(Email, ErrorCode.MISSING_FIELD, 'Correo electronico es requerido').required().isString()
        check(TokenReset, ErrorCode.MISSING_FIELD, 'Código es requerido').required().isString()
        check(NewPassword, 'Nuevas contraseñas deben ser iguales').required().isString()
            .equals(RepeatedPassword, 'Nuevas contraseñas deben ser iguales')

        let user = await this.Users.findOne({
            where: { Email, TokenReset },
        })

        check(user, ErrorCode.INVALID_TOKEN).required()

        // Mudar Password
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(NewPassword, salt)
        user = await user.update({
            Password: hashPassword,
            TokenReset: null,
        })

        const Token = this.generateTokenForUser(user)

        return next(null, 'Contraseña reseteado', { ID: user.ID, Email: user.Email, Token })
    }

    /*
     * Send email Support
     */
    @catcher
    async sendSupportEmail({ email, title, message }, next) {
        check(email, ErrorCode.MISSING_FIELD, 'Correo electronico es requerido').required().isString()

        return next(null, 'Email enviado', { email, title, message })
    }
}

module.exports = UserController
