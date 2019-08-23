const check = require('../auxiliary/Validator').check
const catcher = require('../auxiliary/Decorators').catcher
const Utils = require('../auxiliary/Utils')

class CommentController {
    constructor(sequelize) {
        this.sequelize = sequelize
        this.Comments = sequelize.getModel('Comments')
        this.Books = sequelize.getModel('Books')
    }

    /*
     * Get Comments
     */
    @catcher
    async get({ page = 0, limit = 50, ...where }, user, next) {
        const comments = await this.Comments.findAll({
            where: {
                IDUser: user.ID,
                IDBook: where.IDBook,
            },
            order: [
                ['Created', 'DESC'],
            ],
            limit,
            page,
            raw: true,
        })

        return next(null, 'Get Comments', comments)
    }

    /*
     * Create Comment
     */
    @catcher
    async create(user, model, next) {
        const comment = await this.Comments.create({
            ...model,
            IDUser: user.ID,
            Created: new Date(),
            Updated: new Date(),
        })
        comment.save()

        return next(null, 'Comentario creado', comment)
    }

    /*
     * Delete Recents
     */
    @catcher
    async delete(ID, next) {
        check(ID, 'You need to pass the comment ID').required()
        await this.Comments.destroy({ where: { ID } })
        return next(null, 'Comentario ' + ID + ' borrado')
    }
}

module.exports = CommentController
