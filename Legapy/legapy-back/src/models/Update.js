const sequelizePkg = require('sequelize')

module.exports = (sequelize) => {
    const Updated = sequelize.define('Updates', {
        ID: {
            type: sequelizePkg.BIGINT,
            primaryKey: true,
            autoIncrement: true,
            field: 'ID',
            allowNull: false,
        },
        Updated: {
            type: sequelizePkg.DATE,
            field: 'Updated',
            allowNull: false,
        },
    }, {
        schema: '',
        schemaDelimiter: '.',
        tableName: 'Updates',
        freezeTableName: true,
        timestamps: false,
    })
    return Updated
}
