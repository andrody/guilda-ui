const nodemailer = require('nodemailer')
const mg = require('nodemailer-mailgun-transport')

const auth = {
    auth: {
        api_key: 'key-8d0ed0db639899d3805555a75f40ffca',
        domain: 'sandbox4e37a0866bdb4e40b75a22b1ff2a87a7.mailgun.org',
    },
}
const nodemailerMailgun = nodemailer.createTransport(mg(auth))

const createTestMessage = () => {
    const date = Date.now()
    const msg = '<p><b>Hello! This is a test mail!</b></p> '

    return {
        from: 'BackPacker <no-reply@backpacker.com>',
        to: 'romerio.unix@gmail.com',
        subject: 'BackPacker Mail Test (' + date + ') | <no-reply>',
        text: 'Hello!',
        html: msg,
        watchHtml: msg,
    }
}

const createForgotPasswordMessage = (user, token) => {
    const msg = '<p><b>Hello, ' + user.username + '</b></p>' +
        '<p>Someone has requested to reset the password for your BackPacker account</p>' +
        '<p>Use this code to complete the process: <b>' + token + '</b></p>' +
        '<br><p>If you did not perform this request, you can safely ignore this email.</p>'

    return {
        from: 'BackPacker <no-reply@backpacker.com>',
        to: user.email,
        subject: 'BackPacker Password Reset | <no-reply>',
        text: 'Hello!',
        html: msg,
        watchHtml: msg,
    }
}

let instance = null

class Mailer {
    constructor() {
        if (instance) {
            return instance
        }

        instance = this
        return instance
    }

    sendForgotPasswordMail(user, token, callback) {
        const message = createForgotPasswordMessage(user, token)

        nodemailerMailgun.sendMail(message, (error, info) => {
            if (error) {
                return callback(error)
            }

            return callback(null, info)
        })
    }

    sendTestMail(callback) {
        const message = createTestMessage()

        nodemailerMailgun.sendMail(message, (error, info) => {
            if (error) {
                return callback(error)
            }

            console.log(info)

            return callback(null, info)
        })
    }
}

module.exports = Mailer