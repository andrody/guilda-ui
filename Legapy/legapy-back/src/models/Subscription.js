const sequelizePkg = require('sequelize')

module.exports = (sequelize) => {
    const Subscription = sequelize.define('Subscriptions', {
        ID: {
            type: sequelizePkg.BIGINT,
            primaryKey: true,
            autoIncrement: true,
            field: 'ID',
            allowNull: false,
        },
        IDUser: {
            type: sequelizePkg.BIGINT,
            field: 'IDUser',
            allowNull: false,
        },
        Type: {
            type: sequelizePkg.STRING(50),
            field: 'Type',
        },
        Receipt: {
            type: sequelizePkg.STRING(255),
            field: 'receipt',
        },
        IsValid: {
            type: sequelizePkg.BOOLEAN,
            field: 'receipt',
        },
        Created: {
            type: sequelizePkg.DATE,
            field: 'Created',
            allowNull: true,
        },
    }, {
        schema: '',
        schemaDelimiter: '.',
        tableName: 'Subscriptions',
        freezeTableName: true,
        timestamps: false,
    })

    return Subscription
}
