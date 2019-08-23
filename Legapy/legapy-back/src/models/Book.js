const sequelizePkg = require('sequelize')

module.exports = (sequelize) => {
    const Book = sequelize.define('Books', {
        ID: {
            type: sequelizePkg.BIGINT,
            primaryKey: true,
            autoIncrement: true,
            field: 'ID',
            allowNull: false,
        },
        Name: {
            type: sequelizePkg.STRING(100),
            field: 'Name',
        },
        Category: {
            type: sequelizePkg.INTEGER,
            field: 'Category',
            allowNull: true,
        },
        Description: {
            type: sequelizePkg.TEXT,
            field: 'Description',
        },
        HTML: {
            type: sequelizePkg.TEXT,
            field: 'HTML',
        },
        Created: {
            type: sequelizePkg.DATE,
            field: 'Created',
            allowNull: true,
        },
        Updated: {
            type: sequelizePkg.DATE,
            field: 'Updated',
            allowNull: true,
        },
        HasPdf: {
            type: sequelizePkg.BOOLEAN,
            field: 'HasPdf',
            allowNull: true,
        },
    }, {
        schema: '',
        schemaDelimiter: '.',
        tableName: 'Books',
        freezeTableName: true,
        timestamps: false,
    })

    return Book
}
