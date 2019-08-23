module.exports = class CustomError extends Error {
    constructor(error, message) {
        super(message || error.MESSAGE)

        Error.captureStackTrace(this, this.constructor)
        this.title = error.TITLE || this.constructor.name
        this.description = message || error.MESSAGE
        this.code = error.CODE || ''
        this.status = error.STATUS || 400
    }
}
