import { observable, action } from 'mobx'
import API from '../utils/API'
import * as routes from '../utils/constants'
import UtilSore from './UtilStore'
import ChangePassword from '../containers/Auth/Page/ChangePassword'

class SessionStore {
    @observable user = null

    @action async login(model) {
        const response = await API(routes.LOGIN, 'post', model)
        if (!response.error) {
            this.user = response.data
            this._saveUser(this.user)
        } else {
            alert(response.error.description)
        }
    }

    @action async logout() {
        this.user = null
        localStorage.removeItem('user')
    }

    @action async register(model) {
        const response = await API(routes.REGISTER, 'post', model)
        if (!response.error) {
            return true
        }
        alert(response.error.description)

        return false
    }

    @action async forgotPassword(model) {
        const response = await API(routes.FORGOT_PASSWORD, 'post', model)
        if (!response.error) {
            alert(response.message)
        } else {
            alert(response.error.description)
        }
    }

    @action async resetPassword(model) {
        const response = await API(routes.RESET_PASSWORD, 'post', model)
        if (!response.error) {
            this.user = response.data
            this._saveUser(response.data)
        } else {
            alert(response.error.description)
        }
    }

    @action recoverSession() {
        const user = localStorage.getItem('user')
        const parsedData = JSON.parse(user)
        this.user = parsedData
    }

    @action ChangePassword = async (payload) => {
        const response = await API(routes.CHANGE_PASSWORD, 'post', payload)
        if (!response.error) {
            UtilSore.addToast(response.message)
        } else {
            UtilSore.addToast(response.error.description)
        }
    }

    _saveUser = data => localStorage.setItem('user', JSON.stringify(data))
}

const store = new SessionStore()
window.SessionStore = store
export default store
