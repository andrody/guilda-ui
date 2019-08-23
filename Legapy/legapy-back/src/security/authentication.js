const sequelize = require('../config/database/sequelize')
const Models = require('../config/database/models')
const jwt = require('jsonwebtoken')
const config = require('../config')
const AuthError = require('../errors/CustomError')
const ErrorCode = require('../auxiliary/ErrorCodes')

const superSecret = config.secret
const algorithm = config.algorithm
const tokenTime = config.tokenTime

class Auth {
    static generateCustomToken(payload) {
        if (!payload) {
            throw (new Error('Missing fields to generate token'))
        }

        const token = jwt.sign(
            payload,
            superSecret, {
                expiresIn: tokenTime,
            })

        return token
    }

    static generateLoginToken(userData) {
        if (!userData || !userData.Email) {
            throw (new Error('Missing fields to generate token'))
        }

        const payload = {
            ID: userData.ID,
            Email: userData.Email,
            Created: userData.Created,
            Admin: userData.Admin,
        }

        const token = jwt.sign(
            payload,
            superSecret, {
                expiresIn: tokenTime,
            })

        return token
    }

    static generateOperadorLoginToken(userData) {
        if (!userData || !userData.IDOperador || typeof userData.FLAtivo !== 'boolean') {
            throw (new Error('Missing fields to generate token'))
        }

        const payload = {
            IDOperador: userData.IDOperador,
            FLAtivo: userData.FLAtivo,
            FLAdministrador: userData.FLAdministrador,
        }

        const token = jwt.sign(
            payload,
            superSecret, {
                expiresIn: tokenTime,
            })

        return token
    }

    // static generateTokenMiddleware() {
    //     return (req, res, next) => {
    //         if (!req.user || !req.user.IDUsuario) {
    //             return next(new AuthError(ErrorCode.UNAUTHORIZED, true))
    //         }

    //         req.token = this.generateLoginToken(req.user)

    //         return next()
    //     }
    // }

    // static generateTokenAndRespondMiddleware() {
    //     return (req, res, next) => {
    //         if (!req.user || !req.user.IDUsuario || !req.user.person) {
    //             return next(new Error('Missing fields to generate token'))
    //         }

    //         req.token = this.generateLoginToken(req.user)

    //         return res.status(200).json({
    //             IDUsuario: req.user.IDUsuario,
    //             Name: req.user.person.name,
    //             FLAtivo: req.user.FLAtivo,
    //             token: req.token,
    //         })
    //     }
    // }

    static authorizate({ getUser, onlyDecodeToken, admin } = {}) {
        const UserModel = sequelize.getModel('Users')

        return (req, res, next) => {
            if ((req.currentUser && req.user) || (req.currentUser && !getUser)) {
                return next()
            }

            const token = req.body.token || req.params.token || req.headers.token

            if (token && typeof token === 'string') {
                jwt.verify(token, superSecret, algorithm, async (err, decoded) => {
                    if (err || !decoded || (admin && decoded.Admin != 1)) {
                        return next(new AuthError(ErrorCode.UNAUTHORIZED, true))
                    }

                    try {
                        // requisita model do banco de dados
                        if (getUser) {
                            req.user = await UserModel.findOne({
                                where: { ID: decoded.ID },
                            })
                        }

                        req.currentUser = decoded

                        return next()
                    } catch (errorFind) {
                        return next(errorFind)
                    }
                })
            } else {
                if (onlyDecodeToken) {
                    return next()
                }

                return next(new AuthError(ErrorCode.UNAUTHORIZED))
            }
        }
    }


    static authorizateOperator({ getModel, onlyDecodeToken } = {}) {
        const OperadorModel = sequelize.getModel(Models.OPERADOR)

        return (req, res, next) => {
            if ((req.currentOperator && req.operator) || (req.currentOperator && !getModel)) {
                return next()
            }

            const token = req.body.token || req.params.token || req.headers['x-access-token']

            if (token && typeof token === 'string') {
                jwt.verify(token, superSecret, algorithm, async (err, decoded) => {
                    if (err || !decoded) {
                        return next(new AuthError(ErrorCode.UNAUTHORIZED, true))
                    }

                    try {
                        // impede que usurio de app tente se logar no backoffice
                        if (!decoded.IDOperador) {
                            return next(new AuthError(ErrorCode.UNAUTHORIZED, true))
                        }

                        // requisita model do banco de dados
                        if (getModel) {
                            req.operator = await OperadorModel.findOne({
                                where: { IDOperador: decoded.IDOperador },
                            })
                        }

                        req.currentOperator = decoded

                        return next()
                    } catch (errorFind) {
                        return next(errorFind)
                    }
                })
            } else {
                if (onlyDecodeToken) {
                    return next()
                }

                return next(new AuthError(ErrorCode.UNAUTHORIZED))
            }
        }
    }

    static decodeTokenPerfil({ onlyDecodeToken } = {}) {
        return (req, res, next) => {
            if (req.perfil) {
                return next()
            }

            const token = req.body.tokenPerfil || req.params.tokenPerfil || req.headers['x-perfil-token']

            if (token && typeof token === 'string') {
                jwt.verify(token, superSecret, algorithm, async (err, decoded) => {
                    if (err || !decoded) {
                        return next(new AuthError(ErrorCode.UNAUTHORIZED_PERFIL, true))
                    }

                    try {
                        req.perfil = decoded
                        return next()
                    } catch (errorFind) {
                        return next(errorFind)
                    }
                })
            } else {
                if (onlyDecodeToken) {
                    return next()
                }

                return next(new AuthError(ErrorCode.UNAUTHORIZED_PERFIL))
            }
        }
    }

    static accessRestrition({ allowAdminDirectAccess, allowMasterDirectAccess, isAdmin, isMaster, IDFuncionalidade } = {}) {
        const PerfilModel = sequelize.getModel(Models.PERFIL)
        const PerfilFuncionalidadeModel = sequelize.getModel(Models.PERFIL_FUNCIONALIDADE)

        return async (req, res, next) => {
            // const funcionalidades = Funcionalidades // parseInt(IDFuncionalidade, 10)
            const Funcionalidades = IDFuncionalidade
            let funcId = null

            if (!req.perfil || !req.perfil.IDPerfil) {
                return next(new AuthError(ErrorCode.UNAUTHORIZED_PERFIL))
            }

            const perfil = await PerfilModel.findOne({
                where: {
                    IDPerfil: req.perfil.IDPerfil,
                    FLAtivo: true,
                },
                raw: true,
            })

            // Verifica se o perfil está ativo
            if (!perfil) {
                return next(new AuthError(ErrorCode.UNAUTHORIZED_PERFIL))
            }

            req.perfilModel = perfil

            // Libera acesso total para admin
            if (typeof allowAdminDirectAccess === 'boolean') {
                if (perfil.FLAdministrador === true) { return next() }
            }

            // Libera acesso total para master
            if (typeof allowMasterDirectAccess === 'boolean') {
                if (perfil.FLMaster === true) { return next() }
            }

            // Necessário ser administrador
            if (typeof isAdmin === 'boolean') {
                if (perfil.FLAdministrador !== true) {
                    return next(new AuthError(ErrorCode.UNAUTHORIZED_PERFIL))
                }
            }

            // Necessário ser Master
            if (typeof isMaster === 'boolean') {
                if (perfil.FLMaster !== true) {
                    return next(new AuthError(ErrorCode.UNAUTHORIZED_PERFIL))
                }
            }

            // Valida acesso do perfil à funcionalidade
            if (Array.isArray(Funcionalidades)) {
                const orWhere = Funcionalidades.map(funcIDFuncionalidade => ({ IDFuncionalidade: funcIDFuncionalidade }))

                const isAllowed = await PerfilFuncionalidadeModel.findOne({
                    where: {
                        IDPerfil: perfil.IDPerfil,
                        $or: orWhere,
                    },
                    raw: true,
                })

                if (isAllowed) {
                    return next()
                }
            }

            funcId = parseInt(Funcionalidades, 10)

            if (funcId) {
                const isAllowed = await PerfilFuncionalidadeModel.findOne({
                    where: {
                        IDPerfil: perfil.IDPerfil,
                        IDFuncionalidade: funcId,
                    },
                    raw: true,
                })

                if (isAllowed) {
                    return next()
                }
            }

            return next(new AuthError(ErrorCode.UNAUTHORIZED_PERFIL))
        }
    }
}

module.exports = Auth
