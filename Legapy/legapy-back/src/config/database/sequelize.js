const Sequelize = require('sequelize')
const ModelsList = require('./models')
const fs = require('fs')
const path = require('path')
const numeral = require('numeral')
const config = require('../index')
const recursive = require('recursive-readdir')
const cls = require('continuation-local-storage')

const gmNamespace = cls.createNamespace('ganhoMais-transac')
let instance = null
const isProduction = process.env.NODE_ENV === 'production'

Sequelize.DATE.prototype._stringify = function _stringify(date, options) {
    date = this._applyTimezone(date, options)

    // Z here means current timezone, _not_ UTC
    // return date.format('YYYY-MM-DD HH:mm:ss.SSS Z');
    return date.format('YYYY-MM-DD HH:mm:ss.SSS')
}

const doAssociations = (models) => {
    const User = models.Users
    const Book = models.Books
    const Favorite = models.Favorites
    const Recent = models.Recents
    const Comentario = models.Comments
    const Subscription = models.Subscriptions

    Favorite.belongsTo(User, { targetKey: 'ID', foreignKey: 'IDUser' })
    Favorite.belongsTo(Book, { targetKey: 'ID', foreignKey: 'IDBook' })
    Recent.belongsTo(User, { targetKey: 'ID', foreignKey: 'IDUser' })
    Recent.belongsTo(Book, { targetKey: 'ID', foreignKey: 'IDBook' })
    Comentario.belongsTo(User, { targetKey: 'ID', foreignKey: 'IDUser' })
    Comentario.belongsTo(Book, { targetKey: 'ID', foreignKey: 'IDBook' })
    Subscription.belongsTo(User, { targetKey: 'ID', foreignKey: 'IDUser' })
}

const loadModels = async (sequelize) => {
    const dir = path.join(__dirname, '../../models')
    const models = {}

    const files = await recursive(dir)
    files.forEach((file) => {
        const model = sequelize.import(file)
        models[model.name] = model
    })

    doAssociations(models)

    return models
}

class SequelizeManager {
    constructor() {
        if (!instance) {
            const options = {
                host: config.database.host,
                dialect: 'mssql',
                driver: 'mssql',
                dialectOptions: {
                    requestTimeout: 999999999,
                    encrypt: true,
                },
                logging: !!process.env.DB_VERBOSE, // false,
                pool: { // #TO-DO: Observar o comportamento com transaction
                    max: 200,
                    min: 0,
                    idle: 200000,
                    acquire: 200000,
                },
            }


            // Transaction support
            Sequelize.useCLS(gmNamespace)

            this.sequelize = new Sequelize(config.database.name, config.database.user, config.database.password, options)

            this.database = {
                sequelize: this.sequelize,
                module: Sequelize,
                models: {},
            }

            instance = this
        }

        return instance
    }

    async start() {
        try {
            this.database.models = await loadModels(this.sequelize)
            this.sequelize.sync().done(() => this.database)

            await this.sequelize.authenticate()
            console.log('[Connection has been established successfully.]')
        } catch (err) {
            console.error('[Unable to connect to the database: ', err)
        }
    }

    module() {
        return this.sequelize
    }

    getModel(modelname) {
        // console.log(modelname)
        return this.database.models[modelname]
    }
}

/*
* Numeral Setup
*/
numeral.register('locale', 'br', {
    delimiters: {
        thousands: '.',
        decimal: ',',
    },
    abbreviations: {
        thousand: 'k',
        million: 'm',
        billion: 'b',
        trillion: 't',
    },
    currency: {
        symbol: 'R$',
    },
})
numeral.locale('br')

module.exports = new SequelizeManager()
