const multer = require('multer')
const fs = require('fs')
const Constants = require('../auxiliary/Constants')
const Utils = require('../auxiliary/Utils')
const BookController = require('../controllers/BookController')
const FavoriteController = require('../controllers/FavoriteController')
const authorizate = require('../security/authentication').authorizate
const sequelize = require('../config/database/sequelize')
const pagination = require('../middlewares/pagination')

module.exports = (app, express) => {
    const bookController = new BookController(sequelize)
    const favoriteController = new FavoriteController(sequelize)
    const apiRouter = express.Router()

    const folderToSave = Utils.createFilePath([Constants.rootSystemDir, 'storage'])

    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, folderToSave)
        },
        filename: (req, file, cb) => {
            const fileName = 'book_' + JSON.parse(req.body.Book).ID + '.pdf'

            cb(null, fileName)
        },
    })

    const upload = multer({
        storage,
        limits: { fieldNameSize: 1024, fieldSize: 35 * 1024 * 1024, fields: 10, fileSize: 35 * 1024 * 1024, files: 1, parts: 10, headerPairs: 20 },
    })

    /*
    *  Search Books
    */
    apiRouter.route('/search')
        .get(pagination(), (req, res, next) => {
            bookController.searchBookmarks(req.query, (err, message, data, status = 200) => {
                if (err) return next(err)
                return res.status(status).json({ message, data })
            })
        })

    /*
     *  Get Bookmarks
     */
    apiRouter.route('/')
        .get(pagination(), (req, res, next) => {
            bookController.getBookmarks(req.query, (err, message, data, status = 200) => {
                if (err) return next(err)
                return res.status(status).json({ message, data })
            })
        })

    /*
     *  Get Favorites
     */
    apiRouter.route('/favorites')
        .get(authorizate(), (req, res, next) => {
            favoriteController.get(req.currentUser, (err, message, data, status = 200) => {
                if (err) return next(err)
                return res.status(status).json({ message, data })
            })
        })

    /*
     *  Get Book
     */
    apiRouter.route('/:bookID')
        .get((req, res, next) => {
            bookController.getBook(req.params.bookID, (err, message, data, status = 200) => {
                if (err) return next(err)
                return res.status(status).json({ message, data })
            })
        })

    /*
    *  Create Book
    */
    apiRouter.route('/')
        .post(authorizate({ admin: true }), upload.single('pdf'), (req, res, next) => {
            bookController.create(JSON.parse(req.body.Book), req.file, (err, message, data, status = 200) => {
                if (err) return next(err)
                return res.status(status).json({ message, data })
            })
        })

    /*
    *  Update Book
    */
    apiRouter.route('/:bookID')
        .put(authorizate({ admin: true }), upload.single('pdf'), (req, res, next) => {
            bookController.update(req.params.bookID, JSON.parse(req.body.Book), req.file, (err, message, data, status = 200) => {
                if (err) return next(err)
                return res.status(status).json({ message, data })
            })
        })
    /*
     *  Create Favorite
     */
    apiRouter.route('/favorites')
        .post(authorizate(), (req, res, next) => {
            favoriteController.create(req.currentUser, req.body.IDBook, (err, message, data, status = 200) => {
                if (err) return next(err)
                return res.status(status).json({ message, data })
            })
        })

    /*
     *  Get book PDF
     */
    apiRouter.route('/:bookID/pdf')
        .get((req, res, next) => {
            const filePath = '/book_' + req.params.bookID + '.pdf'
            fs.readFile(folderToSave + filePath, (err, data) => {
                if (err) return next(err)
                res.contentType('application/pdf')
                res.header('Content-disposition', 'filename=libro_' + req.params.bookID + '.pdf')
                res.send(data)
            })
        })

    /*
    *  Delete Favorite
    */
    apiRouter.route('/favorites/:bookID')
        .delete(authorizate(), (req, res, next) => {
            favoriteController.delete(req.currentUser, req.params.bookID, (err, message, data, status = 200) => {
                if (err) return next(err)
                return res.status(status).json({ message, data })
            })
        })

    /*
     *  Delete Book
     */
    apiRouter.route('/:bookID')
        .delete(authorizate({ admin: true }), (req, res, next) => {
            bookController.delete(req.params.bookID, (err, message, data, status = 200) => {
                if (err) return next(err)
                return res.status(status).json({ message, data })
            })
        })

    return apiRouter
}
