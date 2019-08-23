import { observable, action, computed } from 'mobx'
import API from '../utils/API'
import * as routes from '../utils/constants'
import UtilStore from './UtilStore'

class CategoryStore {
    @observable categories = []
    @observable category = {
        Name: '',
        DisplayName: '',
        ParentCategory: null,
    }

    @action async get(filter) {
        const response = await API(routes.CATEGORIES, 'get', filter)
        if (!response.error) {
            this.categories = response.data.categories || []
        }
    }

    @action async save(id) {
        const route = routes.CATEGORIES + '/' + (id || '')
        const response = await API(route, id ? 'put' : 'post', this.category)
        if (!response.error) {
            UtilStore.addToast(response.message)
            if (id) {
                this.categories[this.categories.findIndex((v) => v.ID == id)] = response.data
            } else {
                this.categories = [...this.categories, response.data]
            }
        }
    }

    @action async delete(id, cb) {
        const response = await API(routes.CATEGORIES + '/' + id, 'delete')
        if (!response.error) {
            UtilStore.addToast(response.message)
            this.categories = this.categories.filter(c => c.ID != id)
            if (cb) cb()
        }
    }

    @action clear() {
        this.category = {
            Name: '',
            DisplayName: '',
            ParentCategory: null,
        }
    }
}

const cs = new CategoryStore()
window.CategoryStore = cs
export default cs
