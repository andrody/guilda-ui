const check = require('../auxiliary/Validator').check
const catcher = require('../auxiliary/Decorators').catcher
const Utils = require('../auxiliary/Utils')

class BookController {
    constructor(sequelize) {
        this.sequelize = sequelize
        this.Books = sequelize.getModel('Books')
    }

    /* {limit: 5, id: 5}
     * Get Bookmarks
     */
    @catcher
    async getBookmarks({ page = 0, limit = 50, ...where }, next) {
        const bookmarks = await this.Books.findAndCountAll({
            attributes: ['ID', 'Name', 'Description', 'Category', 'Created'],
            where,
            limit,
            offset: page * limit,
            order: [['Created', 'DESC']],
            raw: true,
        })
        return next(null, 'Get Bookmarks page ' + page, { bookmarks: bookmarks.rows, count: bookmarks.count })
    }

    /* {limit: 5, id: 5}
     * Get Bookmarks
     */
    @catcher
    async searchBookmarks({ page = 0, limit = 50, query, onlyDescription = false }, next) {
        const searchQuery = {
            $or: [
                {
                    Description: {
                        $like: '%' + query + '%',
                    },
                },
            ],
        }

        if (!onlyDescription) {
            searchQuery.$or = [...searchQuery.$or,
                {
                    HTML: {
                        $like: '%' + query + '%',
                    },
                },
            ]
        } else {
            searchQuery.$or = [...searchQuery.$or,
                {
                    Name: {
                        $like: '%' + query + '%',
                    },
                },
            ]
        }

        const bookmarks = await this.Books.findAndCountAll({
            attributes: ['ID', 'Name', 'Description', 'Category', 'Created'],
            where: searchQuery,
            limit,
            offset: page * limit,
            order: [['Created', 'DESC']],
            raw: true,
        })
        return next(null, 'Get Search Bookmarks page ' + page, { bookmarks: bookmarks.rows, count: bookmarks.count })
    }

    /*
     * Get Book
     */
    @catcher
    async getBook(ID, next) {
        const book = await this.Books.findOne({ where: { ID }, raw: true })
        check(book, 'Book not found').required()
        return next(null, 'Book Found', book)
    }

    /*
     * Create Book
     */
    @catcher
    async create(model, pdf, next) {
        check(model, 'Preencha os campos para criar o livro').required()
        if (pdf) {
            model = { ...model, HasPdf: true }
        }
        const newBook = await this.Books.create({ ...model, Created: new Date() })
        newBook.save()
        return next(null, 'Livro Criado', newBook)
    }

    /*
     * Update Book
     */
    @catcher
    async update(ID, model, pdf, next) {
        const book = await this.Books.findOne({ where: { ID } })
        check(book, 'Livro não encontrado').required()
        if (pdf) {
            model = { ...model, HasPdf: true }
        }
        const updatedBook = await book.update({ ...model, Updated: new Date() })
        return next(null, 'Livro atualizado', updatedBook)
    }

    /*
     * Delete Book
     */
    @catcher
    async delete(ID, next) {
        check(ID, 'You need to pass an ID').required()
        await this.Books.destroy({ where: { ID } })
        return next(null, 'Book of index ' + ID + ' deleted')
    }
}

module.exports = BookController
