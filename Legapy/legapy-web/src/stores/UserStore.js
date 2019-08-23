import { observable, action, computed } from 'mobx'
import API from '../utils/API'
import * as routes from '../utils/constants'
import UtilStore from './UtilStore'

class UserStore {
    @observable users = []
    @observable user = {
        ID: '',
        Email: '',
        Password: '',
        Admin: '',
        Created: '',
        TokenReset: '',
        Subscriptions: [{
            ID: '',
            IDUser: '',
            Type: '',
            Receipt: '',
            IsValid: true,
            Created: '',
        }],
    }

    @action async get(filter) {
        const response = await API(routes.USERS, 'get', filter)
        if (!response.error) {
            this.users = response.data || []
        }
    }

    @action async save(id) {
        const route = routes.USERS + '/' + (id || '')
        const response = await API(route, id ? 'put' : 'post', this.user)
        if (!response.error) {
            UtilStore.addToast(response.message)
            if (id) {
                this.users[this.users.findIndex(v => v.ID == id)] = response.data
            } else {
                this.users = [...this.users, response.data]
            }
        }
    }

    // @action async delete(id, cb) {
    //     const response = await API(routes.CATEGORIES + '/' + id, 'delete')
    //     if (!response.error) {
    //         UtilStore.addToast(response.message)
    //         this.categories = this.categories.filter(c => c.ID != id)
    //         if (cb) cb()
    //     }
    // }

    @action clear() {
        this.user = {
            ID: '',
            Email: '',
            Password: '',
            Admin: '',
            Created: '',
            TokenReset: '',
            Subscriptions: [{
                ID: '',
                IDUser: '',
                Type: '',
                Receipt: '',
                IsValid: true,
                Created: '',
            }],
        }
    }
}

export default new UserStore()
