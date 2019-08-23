const sequelizeGMModule = require('../config/database/sequelize')
const Models = require('../config/database/models')

const testeChamandoFuncao = async () => {
    const Pessoa = sequelizeGMModule.getModel(Models.PERSON)

    const personTest = await Pessoa.findOne({
        where: {
            IDPessoa: 1000,
        },
    })

    console.log(personTest)

    await personTest.update({
        FLEstadoCivil: 'C ', // 'C  '
    })

    return null
}

class SequelizeTransaction {
    constructor() {
        this.sequelize = sequelizeGMModule.sequelize
        this.promisesQueryList = []
    }

    async dotTest(callback) {
        const Usuario = sequelizeGMModule.getModel(Models.USUARIO)
        const Pessoa = sequelizeGMModule.getModel(Models.PERSON)
        const personTest = null

        return this.sequelize.transaction(async (t) => {
            try {
                await Usuario.findOne({
                    where: {
                        IDUsuario: 24115, // 24115,
                    },
                    raw: true,
                })

                console.log('########## chegou aqui')
                await testeChamandoFuncao()

                await Usuario.findOne({
                    where: {
                        IDUsuario: 24115, // 24115,
                    },
                    raw: true,
                })
            } catch (e) {
                // throw trigga o rollback
                console.log('### error')
                throw e
            }
        }).then((result) => {
            // success
            console.log('##### sucesso')
            console.log(result)
            return callback(null, 'sucesso')
        }).catch((err) => {
            // fail
            console.log('#### falha na t')
            return callback(err)
        })
    }

    addPromise(promiseQuery) {
        this.promisesQueryList.push(promiseQuery)
    }

    commit() {
        this.sequelize.transaction(t1 =>
            // With CLS enable, queries here will by default use t2
            // Pass in the `transaction` option to define/alter the transaction they belong to.
            Promise.all([
                User.create({ name: 'Bob' }, { transaction: null }),
                User.create({ name: 'Mallory' }, { transaction: t1 }),
                User.create({ name: 'John' }), // this would default to t2
            ]).then((result) => {
                console.log('################### Result')
                console.log(result)
            })
        )
    }
}

module.exports = SequelizeTransaction
