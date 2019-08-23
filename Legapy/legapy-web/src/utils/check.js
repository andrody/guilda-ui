function check(field, key, message) {
    function required() {
        console.log('field = ' + field)
        if (field !== undefined && field !== null && field !== '') return this
        throw {message, key}
    }
    function isOfType(type) {
        if (!field || typeof field === type) return this
        throw {message, key}
    }
    function isLength({ min = 0, max = 20000 }) {
        if (field.length >= min && field.length <= max) return this
        throw {message, key}
    }
    function isString({ min = 0, max = Number.MAX_VALUE } = {}) {
        if (!field || (typeof field === 'string' && isLength({ min, max }))) return this
        throw {message, key}
    }
    function isValidString({ min = 1, max = Number.MAX_VALUE } = {}) {
        if (typeof field === 'string' && isLength({ min, max })) return this
        throw {message, key}
    }
    function isNumber() {
        if (!field || (typeof field === 'number' && isNaN(field) && !isFinite(field))) return this
        throw {message, key}
    }
    function isInteger() {
        if (field && (Number.isInteger(field))) return this
        throw {message, key}
    }
    function isNull() {
        if (field === undefined || field === null) return this
        throw {message, key}
    }
    function isFunction() {
        if (!field || (typeof field === 'function')) return this
        throw {message, key}
    }
    function isBoolean() {
        if (!field || (typeof field === 'boolean')) return this
        throw {message, key}
    }
    function isArray({ min = 0, max = Number.MAX_VALUE } = {}) {
        if (!field || (Array.isArray(field) && isLength({ min, max }))) return this
        throw {message, key}
    }
    function isObject() {
        if (!field || typeof field === 'object') return this
        throw {message, key}
    }
    function equals(otherField, newCode) {
        if (!field || otherField === field) return this
        throw newCode || {message, key}
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
  
export default check
  