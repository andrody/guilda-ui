const sequelizePkg = require('sequelize')

module.exports = (sequelize) => {
    const Recent = sequelize.define('Recents', {
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
        IDBook: {
            type: sequelizePkg.BIGINT,
            field: 'IDBook',
            allowNull: false,
        },
        Created: {
            type: sequelizePkg.DATE,
            field: 'Created',
            allowNull: true,
        },
    }, {
        schema: '',
        schemaDelimiter: '.',
        tableName: 'Recents',
        freezeTableName: true,
        timestamps: false,
    })

    return Recent
}
