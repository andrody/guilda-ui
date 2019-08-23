const sequelizePkg = require('sequelize')

module.exports = (sequelize) => {
    const Comment = sequelize.define('Comments', {
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
            allowNull: false,
        },
        Description: {
            type: sequelizePkg.TEXT,
            field: 'Description',
            allowNull: false,
        },
    }, {
        schema: '',
        schemaDelimiter: '.',
        tableName: 'Comments',
        freezeTableName: true,
        timestamps: false,
    })

    return Comment
}
