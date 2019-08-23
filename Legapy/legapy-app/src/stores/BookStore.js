import { observable, action, toJS } from 'mobx'
import { Toast } from 'native-base'
import { Alert } from 'react-native'
import { WebBrowser } from 'expo'
import SessionStore from './SessionStore'
import API from '../utils/API'
import { BOOKS, FAVORITES, RECENTS, SEARCH } from '../constants/constants'

class BookStore {
    @observable bookmarks = []
    @observable bookmarksCount = []
    @observable searchBookmarks = []
    @observable searchBookmarksCount = []
    @observable favorites = []
    @observable recents = []
    @observable book
    @observable draft

    @action get = async (filter, isNextPage) => {
        const response = await API(BOOKS, { ...filter }, 'get')
        if (!response.error) {
            if (isNextPage) {
                this.bookmarks = [...this.bookmarks, ...response.data.bookmarks]
            } else {
                this.bookmarks = response.data.bookmarks || []
                this.bookmarksCount = response.data.count || response.data.bookmarks.length
            }
        }
    }

    @action search = async (query) => {
        if (query.length > 3) {
            const response = await API(SEARCH, { query }, 'get')
            if (!response.error) {
                this.searchBookmarks = response.data.bookmarks || []
                this.searchBookmarksCount = response.data.count || this.searchBookmarks.length
            }
        }
    }

    @action getFavorites = async (filter, noLoading) => {
        const response = await API(FAVORITES, { ...filter }, 'get', null, noLoading)
        if (!response.error) {
            this.favorites = response.data
        }
    }

    @action getRecents = async (filter) => {
        const response = await API(BOOKS, { ...filter }, 'get')
        if (!response.error) {
            this.recents = response.data.bookmarks || []
        }
    }

    @action getBook = async (id) => {
        const response = await API(BOOKS + '/' + id, null, 'get')
        if (!response.error) {
            const draft = await this.loadDraft(id)
            if (draft) {
                response.data.HTML = draft
            }
            this.book = response.data || {}
        }
    }

    @action getPdf = async (id) => {
        WebBrowser.openBrowserAsync(BOOKS + '/' + id + '/pdf')
    }

    @action createFavorite = async (book, cb) => {
        await API(FAVORITES, { IDBook: book.ID }, 'post')
    }

    @action deleteFavorite = async (book, cb) => {
        await API(FAVORITES + '/' + book.ID, null, 'delete')
    }

    // @action createRecents = async (IDBook) => {
    //     await API(RECENTS, { IDBook }, 'post')
    // }

    @action clearBook = () => {
        this.book = null
        this.draft = null
    }

    @action clear = () => {
        this.bookmarks = []
        // this.favorites = []
        this.recents = []
        this.searchBookmarks = []
    }

    @action saveDraft = async (IDBook, payload, cb) => {
        global.storage.save({
            key: IDBook.toString(),
            data: payload,
            expires: null,
        })
        Toast.show({
            text: 'Borrador salvo con éxito',
            buttonText: 'Ok',
            type: 'success',
            duration: 5000,
        })
        this.book = null
        cb()
        setTimeout(() => this.getBook(IDBook), 500)
    }

    @action loadDraft = async (IDBook) => {
        try {
            const html = await global.storage.load({
                key: IDBook.toString(),
                autoSync: true,
                syncInBackground: true,
            })
            this.draft = JSON.parse(html)
        } catch (err) {
            this.draft = null
        }
        return this.draft
    }

    @action deleteDraft = async (IDBook, cb) => {
        Alert.alert(
            'Editor',
            '¿Desea borrar la edición?',
            [
                { text: 'Cancelar', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                {
                    text: 'Borrar',
                    onPress: () => {
                        global.storage.remove({
                            key: IDBook.toString(),
                        })
                        this.book = null
                        cb()
                        setTimeout(() => this.getBook(IDBook), 500)
                    },
                },
            ],
            { cancelable: true },
        )
    }
}

export default new BookStore()
