const check = require('../auxiliary/Validator').check
const catcher = require('../auxiliary/Decorators').catcher
const Utils = require('../auxiliary/Utils')

class FavoriteController {
    constructor(sequelize) {
        this.sequelize = sequelize
        this.Books = sequelize.getModel('Books')
        this.Favorites = sequelize.getModel('Favorites')
    }

    /*
     * Get Favorite Bookmarks
     */
    @catcher
    async get(user, next) {
        const favorites = await this.Favorites.findAll({
            where: {
                IDUser: user.ID,
            },
            order: [
                ['Created', 'DESC'],
            ],
            include: [{
                model: this.Books,
                attributes: ['ID', 'Name', 'Description', 'Category', 'Created'],
            }],
        })

        return next(null, 'Get Favorites', favorites.map(f => f.Book))
    }

    /*
     * Create Book
     */
    @catcher
    async create(user, IDBook, next) {
        const newFavorite = await this.Favorites.create({
            IDUser: user.ID,
            IDBook,
            Created: new Date(),
        })
        newFavorite.save()
        return next(null, 'Favorito Creado', newFavorite)
    }

    /*
     * Delete Favorite
     */
    @catcher
    async delete(user, IDBook, next) {
        check(IDBook, 'You need to pass the book ID').required()
        await this.Favorites.destroy({ where: { IDBook, IDUser: user.ID } })
        return next(null, 'Favorito con ID ' + IDBook + ' borrado')
    }
}

module.exports = FavoriteController
