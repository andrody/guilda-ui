import { observable, action, toJS } from 'mobx'
import API from '../utils/API'
import { CATEGORIES, CATEGORIES_LAST_UPDATE } from '../constants/constants'

class CategoryStore {
@observable categories = []
@observable subcategory

@action get = async (filter) => {
    const categories = await this.loadCategories()
    if (categories.length > 0) {
        this.categories = categories
    } else {
        const response = await API(CATEGORIES, filter, 'get')
        if (!response.error) {
            this.categories = response.data.categories || []
            this.saveCategories(this.categories, response.data.lastUpdated)
        }
    }
}

@action saveCategories = async (categories, lastUpdated) => {
    try {
        global.storage.save({
            key: 'Categories',
            data: categories,
            expires: null,
        })
        global.storage.save({
            key: 'lastUpdated',
            data: lastUpdated,
            expires: null,

        })
    } catch (e) {
        console.log(e)
    }
}

@action loadCategories = async () => {
    try {
        const categories = await global.storage.load({
            key: 'Categories',
            autoSync: true,
            syncInBackground: true,
        })
        this.categories = categories
    } catch (err) {
        this.categories = []
    }
    return this.categories
}

@action checkLastUpdated = async () => {
    const response = await API(CATEGORIES_LAST_UPDATE, null, 'get', null, true)
    if (!response.error) {
        try {
            const lastUpdated = await global.storage.load({
                key: 'lastUpdated',
                autoSync: true,
                syncInBackground: true,
            })
            if (lastUpdated.Updated !== response.data.Updated) {
                global.storage.remove({
                    key: 'Categories',
                })
            }
        } catch (err) {
            global.storage.remove({
                key: 'Categories',
            })
        }
    }
}
}

export default new CategoryStore()
