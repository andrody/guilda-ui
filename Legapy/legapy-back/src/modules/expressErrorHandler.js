/*
 * Refactory : Testar "tipos de erros" ao invés de testar diretamente strings
 */
const CustomError = require('../errors/CustomError')

module.exports = app => (err, req, res, next) => {
    if (process.env.DEBUG_ON || app.get('env') === 'development') {
        console.log('[express.js] An error ocurred')
        console.log(err)
    }

    if (err) {
        if (err instanceof CustomError) {
            return res.status(err.status).json({ message: 'Erro na requisição', error: err })
        }
        if (err && err.name === 'SequelizeDatabaseError') {
            return res.status(400).json({ message: 'Erro na requisição', error: err })
        }

        if (app.get('env') === 'development') {
            return res.status(err.status || 500).send({ message: 'Erro na requisição',
                error: {
                    title: err.toString(),
                    description: err.message,
                },
                stack: err.stack,
            })
        }

        // Server Error
        return res.status(err.status || 500).json({ message: 'Erro na requisição',
            error: {
                title: err.toString(),
                description: err.message,
            },
            stack: err.stack,
        })
    }

    return next()
}
