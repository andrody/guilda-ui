const sequelize = require('./sequelize')

class DatabaseManager {
    static async init() {
        await sequelize.start()
    }
}

module.exports = DatabaseManager
