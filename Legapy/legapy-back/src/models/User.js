const sequelizePkg = require('sequelize')
const bcrypt = require('bcrypt')
const CustomError = require('../errors/CustomError')
const ErrorCode = require('../auxiliary/ErrorCodes')

module.exports = (sequelize) => {
    const User = sequelize.define('Users', {
        ID: {
            type: sequelizePkg.BIGINT,
            primaryKey: true,
            autoIncrement: true,
            field: 'ID',
            allowNull: false,
        },
        Email: {
            type: sequelizePkg.STRING(100),
            field: 'Email',
        },
        Password: {
            type: sequelizePkg.STRING(255),
            field: 'Password',
        },
        Admin: {
            type: sequelizePkg.INTEGER,
            field: 'Admin',
        },
        Created: {
            type: sequelizePkg.DATE,
            field: 'Created',
            allowNull: true,
        },
        TokenReset: {
            type: sequelizePkg.STRING(100),
            field: 'TokenReset',
        },
    }, {
        schema: '',
        schemaDelimiter: '.',
        tableName: 'Users',
        freezeTableName: true,
        timestamps: false,
    })

    // $2a$10$.mf6FVFPbl5ogEguRssaB.MMgzUNkO2tNwUPwB8TNIcOaZMtq22Tm
    User.prototype.validatePassword = function validatePassword(password, callback) {
        const user = this

        return bcrypt.compare(password, user.Password, (error, isCorrect) => {
            if (error) {
                return callback(new CustomError(ErrorCode.BAD_REQUEST))
            }

            return callback(null, isCorrect)
        })
    }

    return User
}
