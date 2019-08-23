const Twilio = require('twilio')

const accountSid = 'ACeb711213167317ffcdc364435d08d1f7' // Your Account SID from www.twilio.com/console
const authToken = 'fd9ea8ec2f172fa8488c94e114e9ed27' // Your Auth Token from www.twilio.com/console
const fromNumber = '+12015975376' // Your Auth Token from www.twilio.com/console

const sendSms = async (mobileNumber, msg) => {
    try {
        const client = new Twilio(accountSid, authToken)
        const returnMessage = await client.messages.create({
            body: msg,
            to: mobileNumber, // Text this number
            from: fromNumber, // From a valid Twilio number
        })
        return returnMessage
    } catch (e) {
        return e
    }
}

module.exports = {
    sendSms,
}
