/* Transforma page e limit para inteiros
========================================================================== */
module.exports = () => (req, res, next) => {
    req.query.page = parseInt(req.query.page, 10) || undefined
    req.query.limit = parseInt(req.query.limit, 10) || undefined
    return next()
}

