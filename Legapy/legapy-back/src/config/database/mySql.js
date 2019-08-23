const mysql = require('mysql')

class MySqlManager {
    static init(options) {
        if (!options) {
            throw new Error('Missing MySql params')
        }

        const connection = mysql.createConnection({
            host: options.host,
            user: options.user,
            password: options.password,
        })

        connection.connect((err) => {
            if (err) {
                console.error('error connecting: ' + err.stack)
                return
            }

            console.log('connected as id ' + connection.threadId)
        })
    }
}

module.exports = MySqlManager
