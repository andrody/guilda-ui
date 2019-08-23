import { observable, action } from 'mobx'
import API from '../utils/API'
import * as routes from '../utils/constants'
import UtilStore from './UtilStore'

class BookStore {
    @observable onLawView = false
    @observable editMode = false
    @observable bookmarks = []
    @observable bookmarksCount = 0
    @observable favorites = []
    @observable recents = []
    @observable draft
    @observable book = {
        ID: '',
        Name: '',
        Category: '',
        Description: '',
        HTML: '',
        Created: null,
        HasPdf: false,
    }

    @action async get(filter, isNextPage) {
        const response = await API(routes.BOOKS, 'get', filter)
        if (!response.error) {
            if (isNextPage) {
                this.bookmarks = [...this.bookmarks, ...response.data.bookmarks]
            } else {
                this.bookmarks = response.data.bookmarks || []
                this.bookmarksCount = response.data.count || response.data.bookmarks.length
            }
        }
    }

    @action async getBook(id) {
        const myBook = this._checkUserSavedBook(id)
        if (myBook) {
            this.book = myBook
        } else {
            const response = await API(routes.BOOKS + '/' + id, 'get')
            if (!response.error) {
                this.book = response.data || {}
            }
    
            // Adiciona o livro nos recentes do usuário
            // this.createRecents(id)
        }
    }
    
    _checkUserSavedBook = (id) => {
        const mySavedBooks = localStorage.getItem('mySavedBooks')
        if (mySavedBooks) {
            const parsedBooks = JSON.parse(mySavedBooks)
            const mybook = parsedBooks.find(book => book.ID == id)
            return mybook
        }
        return false
    }

    @action saveLocalBook = (text, id) => {
        this.book.HTML = text
        let i = -1
        const mySavedBooks = localStorage.getItem('mySavedBooks')
        if (mySavedBooks) {
            let parsedBooks = JSON.parse(mySavedBooks)
            i = parsedBooks.findIndex(book =>  book.ID == id)
            if (i != -1) {
                parsedBooks.splice(i, 1)
                parsedBooks = [...parsedBooks, this.book]
                const stringBooks = JSON.stringify(parsedBooks)
                localStorage.setItem('mySavedBooks', stringBooks)
            } else {
                parsedBooks = [...parsedBooks, this.book]
                const stringBooks = JSON.stringify(parsedBooks)
                localStorage.setItem('mySavedBooks', stringBooks)
            }
        } else {
            const parsedBooks = [this.book]
            const stringBooks = JSON.stringify(parsedBooks)
            localStorage.setItem('mySavedBooks', stringBooks)
        }
    }

    @action restoreBook = (id) => {
        const mySavedBooks = localStorage.getItem('mySavedBooks')
        let i = -1
        if (mySavedBooks) {
            let parsedBooks = JSON.parse(mySavedBooks)
            i = parsedBooks.findIndex(book =>  book.ID == id)
            if (i != -1) {
                parsedBooks.splice(i, 1)
                const stringBooks = JSON.stringify(parsedBooks)
                localStorage.setItem('mySavedBooks', stringBooks)
            }
        }
        this.getBook(id)
    }

    @action search = async (query, isNextPage) => {
        if (query.length > 3) {
            const response = await API(routes.SEARCH + query)
            if (isNextPage) {
                this.bookmarks = [...this.bookmarks, ...response.data.bookmarks]
            } else {
                this.bookmarks = response.data.bookmarks || []
                this.bookmarksCount = response.data.count || response.data.bookmarks.length
            }
        } else {
            UtilStore.addToast('Escriba al menos 3 letras')
        }
    }

    @action async save(id, file) {
        const route = routes.BOOKS + '/' + (id || '')
        const formData = new FormData()
        formData.append('Book', JSON.stringify(this.book))
        formData.append('pdf', file)
        console.log('this.book')
        console.log(this.book)
        const response = await API(route, id ? 'put' : 'post', formData)
        if (!response.error) {
            UtilStore.addToast(response.message)
            if (id) {
                this.bookmarks[this.bookmarks.findIndex(v => v.ID == id)] = response.data
            } else {
                this.bookmarks = [...this.bookmarks, response.data]
            }
        }
    }

    @action async delete(id, cb) {
        const response = await API(routes.BOOKS + '/' + id, 'delete')
        if (!response.error) {
            UtilStore.addToast(response.message)
            this.bookmarks = this.bookmarks.filter(c => c.ID != id)
            if (cb) cb()
        }
    }

    @action getFavorites = async (isNextPage) => {

        const response = await API(routes.FAVORITES, 'get')
        if (!response.error) {
            if (isNextPage) {
                this.favorites = [...this.favorites, ...response.data]
            } else {
                this.favorites = response.data || []
                // this.bookmarksCount = response.data.count || response.data.bookmarks.length
            }
        }
    }

    @action createFavorite = async (id) => {
        const response = await API(routes.FAVORITES, 'post', { IDBook: id })
        UtilStore.addToast(response.message)
    }

    @action deleteFavorite = async (id) => {
        await API(routes.FAVORITES + '/' + id, 'delete')
    }

    @action createRecents = async (IDBook) => {
        await API(routes.RECENTS, 'post', { IDBook })
    }

    @action getRecents = async () => {
        // const response = await API(routes.RECENTS, 'get')
        const response = await API(routes.BOOKS, 'get')
        if (!response.error) this.recents = response.data.bookmarks
    }

    @action clear = () => {
        this.book = {
            ID: '',
            Name: '',
            Category: '',
            Description: '',
            HTML: '',
            Created: null,
        }
        this.draft = null
    }
}

export default new BookStore()
