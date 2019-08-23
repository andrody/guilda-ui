const sequelizePkg = require('sequelize')

module.exports = (sequelize) => {
    const Category = sequelize.define('Categories', {
        ID: {
            type: sequelizePkg.BIGINT,
            primaryKey: true,
            autoIncrement: true,
            field: 'ID',
            allowNull: false,
        },
        Name: {
            type: sequelizePkg.STRING(75),
            field: 'Name',
        },
        DisplayName: {
            type: sequelizePkg.STRING(75),
            field: 'DisplayName',
        },
        ParentCategory: {
            type: sequelizePkg.INTEGER,
            field: 'ParentCategory',
            allowNull: true,
        },
        IsRootNode: {
            type: sequelizePkg.BOOLEAN,
            field: 'IsRootNode',
        },
        HasBook: {
            type: sequelizePkg.BOOLEAN,
            field: 'HasBook',
        },
        HasSub: {
            type: sequelizePkg.BOOLEAN,
            field: 'HasSub',
        },
        Created: {
            type: sequelizePkg.DATE,
            field: 'Created',
            allowNull: true,
        },
    }, {
        schema: '',
        schemaDelimiter: '.',
        tableName: 'Categories',
        freezeTableName: true,
        timestamps: false,
    })

    // Category.find = async (query) => {
    //     const categories = await Category.findAll({ where: { ...query } })
    //     return categories
    // }

    return Category
}
