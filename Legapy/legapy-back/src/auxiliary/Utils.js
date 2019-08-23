const crypto = require('crypto')
const base64url = require('base64url')
const numeral = require('numeral')
const nodemailer = require('nodemailer')
const ErrorCodes = require('./ErrorCodes')
const ValidationError = require('../errors/CustomError')
const promisify = require('util').promisify

const defaultSize = 40

class Utils {
    static generateToken(size, callback) {
        let bytesSize = defaultSize

        if (typeof size === 'function') {
            callback = size
        } else {
            bytesSize = size
        }

        crypto.randomBytes(bytesSize, (err, buffer) => {
            if (err) return callback(err)

            return callback(null, base64url(buffer))
        })
    }

    static retornaNomePortugues(param) {
        let oMsg = ''

        switch (param) {
        case 'keepAsIs':
            oMsg = 'Manter como está'
            break
        case 'refinancing':
            oMsg = 'Refinanciamento'
            break
        case 'portability':
            oMsg = 'Portabilidade'
            break
        case 'refin_portability':
            oMsg = 'Refinanciamento pós portabilidade'
            break
        default:
            break
        }

        return oMsg
    }

    static randomNumber(options, callback) {
        let minimum = 100000
        let maximum = 9999999
        const distance = maximum - minimum
        const error = new ValidationError(ErrorCodes.INVALID_PARAMETER)

        if (!callback) {
            callback = options
        } else {
            if (options.max) {
                maximum = options.max
            }

            if (options.min) {
                minimum = options.min
            }
        }

        if (minimum >= maximum) {
            console.log('Minimum number should be less than maximum')
            return callback(error)
        } else if (distance > 281474976710655) {
            console.log('You can not get all possible random numbers if range is greater than 256^6-1')
            return callback(error)
        } else if (maximum > Number.MAX_SAFE_INTEGER) {
            console.log('Maximum number should be safe integer limit')
            return callback(error)
        }
        const maxBytes = 6
        const maxDec = 281474976710656

        // To avoid huge mathematical operations and increase function performance for small ranges, you can uncomment following script
        /*
        if(distance<256){
            maxBytes = 1;
            maxDec = 256;
        } else if(distance<65536){
            maxBytes = 2;
            maxDec = 65536;
        } else if(distance<16777216){
            maxBytes = 3;
            maxDec = 16777216;
        } else if(distance<4294967296){
            maxBytes = 4;
            maxDec = 4294967296;
        } else if(distance<1099511627776){
            maxBytes = 4;
            maxDec = 1099511627776;
        }
        */

        const randbytes = parseInt(crypto.randomBytes(maxBytes).toString('hex'), 16)
        let result = Math.floor(randbytes / maxDec * (maximum - minimum + 1) + minimum)

        if (result > maximum) {
            result = maximum
        }

        return callback(null, result)
    }

    static async randomShortCode(bytesSize = 10) {
        try {
            const randomBytesAsync = promisify(crypto.randomBytes)
            let base64String = null
            let finalString = null

            const buffer = await randomBytesAsync(bytesSize)

            base64String = base64url(buffer)
            finalString = base64String.replace(/-/g, '').toUpperCase()

            return finalString
        } catch (e) {
            throw e
        }
    }

    /*
    * Transforma Float (Decimal) em string formatada com R$
    * 100000000.52 -> R$ 100.000.000,00
    */
    static formatCurrency(value) {
        return value ? numeral(value).format('$ 0,0.00') : value
    }

    /*
    * Transforma Float (Decimal) em string formatada
    * 100000000.52 -> 100.000.000,00
    */
    static formatDecimal(value) {
        return value ? numeral(value).format('0,0.00') : value
    }

    /*
    * Transforma string em Decimal
    * R$ 100.000.000,00 -> 100000000.52
    */
    static parseDecimal(value) {
        if (typeof value === 'number') { return value }
        if (value.search(',') === -1) return parseFloat(value)
        return value ? parseFloat(value.split(/\./).join('').split(/,/).join('.')
            .replace('R$', '')) : value
    }

    /*
    * Trunca float
    * 1444.00952515-> 1444.01
    */
    static parseAndTruncateFloat(value) {
        // return value ? value.toFixed(2) : value
        return value ? parseFloat((parseFloat(value)).toFixed(2)) : value
    }

    /*
    * Soma floats
    * 1444.00952515-> 1444.01
    */
    static subtractFloat(value1, value2) {
        value1 = parseFloat((parseFloat(value1)).toFixed(2))
        value2 = parseFloat((parseFloat(value2)).toFixed(2))

        return parseFloat((parseFloat(value1 - value2).toFixed(2)))
    }

    static removeNullKeys(obj) {
        if (typeof obj !== 'object') { return obj }

        Object.keys(obj).forEach((key) => {
            if (obj[key] === null || obj[key] === undefined) { delete obj[key] }
        })

        return obj
    }

    // Create Access Code
    static generateAccessCode(digits = 5) {
        return String(Math.floor(Math.random() * Math.pow(10, digits)))
    }

    static async sendEmail({ to, subject, text }) {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'no.reply.legapy@gmail.com',
                pass: 'legapy@1234',
            },
        })
        const mailOptions = {
            from: '"Legapy 👍" <no-reply@legapy.com>',
            to,
            subject,
            text,
        }

        const data = await transporter.sendMail(mailOptions)
        return data
    }

    /*
    *  Recebe um array com partes de um caminho de arquivo ou diretório
    *  cada string/item do array será concatenado, formando um caminho completo
    *  independente da plataforma (Linux, Mac, Win)
    */
    static createFilePath(itens) {
        const barChar = /^win/.test(process.platform) ? '\\' : '/'

        if (!Array.isArray(itens) || itens.length !== 2) {
            return itens
        }

        return itens[0] + barChar + itens[1]
    }

    /*
    *  Recebe um array com partes de um caminho de arquivo ou diretório
    *  cada string/item do array será concatenado, formando um caminho completo
    *  independente da plataforma (Linux, Mac, Win)
    */
    static validateCpf(cpf) {
        let numeros
        let digitos
        let soma
        let i
        let resultado
        let digitos_iguais
        digitos_iguais = 1
        if (cpf.length < 11) { return false }
        for (i = 0; i < cpf.length - 1; i++) {
            if (cpf.charAt(i) != cpf.charAt(i + 1)) {
                digitos_iguais = 0
                break
            }
        }
        if (!digitos_iguais) {
            numeros = cpf.substring(0, 9)
            digitos = cpf.substring(9)
            soma = 0
            for (i = 10; i > 1; i--) { soma += numeros.charAt(10 - i) * i }
            resultado = soma % 11 < 2 ? 0 : 11 - soma % 11
            if (resultado != digitos.charAt(0)) { return false }
            numeros = cpf.substring(0, 10)
            soma = 0
            for (i = 11; i > 1; i--) { soma += numeros.charAt(11 - i) * i }
            resultado = soma % 11 < 2 ? 0 : 11 - soma % 11
            if (resultado != digitos.charAt(1)) { return false }
            return true
        }
        return false
    }
}

module.exports = Utils
