const CustomError = require('../errors/CustomError')
const ErrorCode = require('./ErrorCodes')

const throwError = (code, msg) => {
    if (msg) return new CustomError(code, msg)

    let errorCode = ErrorCode.MISSING_FIELD
    let message = code
    if (typeof code === 'object') {
        errorCode = code
        message = null
    }
    return new CustomError(errorCode, message)
}

function check(field, code, message) {
    function required() {
        if (field !== undefined && field !== null) return this
        throw throwError(code, message)
    }
    function isNull() {
        if (field === undefined || field === null) return this
        throw throwError(code, message)
    }
    function isOfType(type) {
        if (typeof field === type) return this
        throw throwError(code, message)
    }
    function isLength({ min = 0, max = 20000 }) {
        if (field.length >= min && field.length <= max) return this
        throw throwError(code, message)
    }
    function isString({ min = 0, max = Number.MAX_VALUE } = {}) {
        if ((typeof field === 'string' && isLength({ min, max })) || isNull(field)) return this
        throw throwError(code, message)
    }
    function isValidString({ min = 1, max = Number.MAX_VALUE } = {}) {
        if ((typeof field === 'string' && isLength({ min, max })) || isNull(field)) return this
        throw throwError(code, message)
    }
    function isNumber() {
        if ((typeof field === 'number' && isNaN(field) && !isFinite(field)) || isNull(field)) return this
        throw throwError(code, message)
    }
    function isInteger() {
        if ((Number.isInteger(field)) || isNull(field)) return this
        throw throwError(code, message)
    }
    function isFunction() {
        if ((typeof field === 'function') || isNull(field)) return this
        throw throwError(code, message)
    }
    function isBoolean(param) {
        if ((typeof field === 'boolean') || isNull(field)) {
            if (param !== null && param !== undefined) {
                if (param === field) {
                    return this
                }
            } else {
                return this
            }
        }

        throw throwError(code, message)
    }
    function isArray({ min = 0, max = Number.MAX_VALUE } = {}) {
        if ((Array.isArray(field) && isLength({ min, max })) || isNull(field)) return this
        throw throwError(code, message)
    }
    function isObject() {
        if (typeof field === 'object' || isNull(field)) return this
        throw throwError(code, message)
    }
    function equals(otherField, newCode) {
        if (otherField === field || isNull(field)) return this
        throw throwError(newCode)
    }
    return {
        required,
        isOfType,
        isString,
        isValidString,
        isInteger,
        isNumber,
        isNull,
        isArray,
        isFunction,
        isBoolean,
        isLength,
        isObject,
        equals,
    }
}

/*
*   @DECORATOR
*   No parameters - Use with method 'validate'
*/
const validate = (target, property, descriptor) => {
    const func = descriptor.value
    descriptor.value = function _newFunc(...args) {
        try {
            const childFunc = func.apply(this, args)
            if (childFunc instanceof Promise) {
                childFunc.catch(e => args[args.length - 1](e))
            }
        } catch (e) {
            args[args.length - 1](e)
        }
    }
    return descriptor
}

/*
*   @DECORATOR
*   
*   Example Input
*   {
*       field: 'bar',
*       type: 'string',
*       maxLength: 12,
*       minLength: 2,
*   }
*/
// function autovalidate(...fields) {
//     return function _validation(key, target, descriptor) {
//         const func = descriptor.value
//         descriptor.value = function _newFunc(...args) {
//             let res
//             try {
//                 const toValidateFields = fields.map(f => ({
//                     ...f,
//                     field: args[0][f.field],
//                 }))
//                 validate(...toValidateFields)
//                 res = func.apply(this, args)
//             } catch (e) {
//                 args[args.length - 1](e)
//             }
//             return res
//         }
//         return descriptor
//     }
// }

module.exports = {
    validate,
    check,
}
