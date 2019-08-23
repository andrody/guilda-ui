import { observable, action } from 'mobx'
import API from '../utils/API'
import * as routes from '../utils/constants'

class AppStore {
    @observable title = ''

    @action async setTitle(title) {
        this.title = title
    }
}

export default new AppStore()
