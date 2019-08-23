const NodeMailerClass = require('./nodemailer')

let instance = null
let that = null

class UserNotificator {
    constructor() {
        if (instance) {
            return instance
        }

        this.NodeMailer = new NodeMailerClass()

        that = this
        instance = this
        return instance
    }

    notificateTest(callback) {
        that.NodeMailer.sendTestMail((errorMail, info) => {
            if (errorMail) {
                return callback(errorMail)
            }

            return callback(null, info)
        })
    }
}

module.exports = UserNotificator