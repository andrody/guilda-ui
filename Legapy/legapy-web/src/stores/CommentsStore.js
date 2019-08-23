import { observable, action } from 'mobx'
import API from '../utils/API'
import { BOOKS } from '../utils/constants'

class CommentsStore {
    @observable comments = []

    @action getComments = async (bookId) => {
        const response = await API(BOOKS + `/${bookId}/comments`)
        this.comments = response.data
    }

    @action addComment = async (payload) => {
        const response = await API(BOOKS + `/${payload.IDBook}/comments`, 'post', payload )
        console.log(response)
        this.getComments(payload.IDBook)
    }

    @action deleteComment = async (payload) => {
        console.log(BOOKS + `/${payload.IDBook}/comments/${payload.IDComment}`)
        const response = await API(BOOKS + `/${payload.IDBook}/comments/${payload.IDComment}`, 'delete', {})
        console.log(response)
        this.getComments(payload.IDBook)
    }
}

export default new CommentsStore()
