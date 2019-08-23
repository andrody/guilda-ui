/*
    O sanitize será preferencialmente por cada string, e não por objeto
    Método sanitizeObject vai ser depreciado
*/

const mongoSanitize = require('mongo-sanitize')

const sanitizeArray = (arrayPayload) => {
    if (arrayPayload && Array.isArray(arrayPayload)) {
        for (let i = 0; i < arrayPayload.length; i++) {
            if (typeof arrayPayload[i] === 'string') { arrayPayload[i] = mongoSanitize(arrayPayload[i]) }
        }

        return arrayPayload
    }

    return null
}

exports.sanitizeArray = sanitizeArray
