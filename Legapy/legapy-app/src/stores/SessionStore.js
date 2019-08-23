import { observable, action } from 'mobx'
import { AsyncStorage } from 'react-native'
import { Toast } from 'native-base'
import API from '../utils/API'
import { LOGIN, CHANGE_PASSWORD, REGISTER, FORGOT_PASSWORD, RESET_PASSWORD } from '../constants/constants'

class SessionStore {
  @observable user

  @action recoverSession = async () => {
      try {
          const user = await AsyncStorage.getItem('user')
          if (user) {
              this.user = JSON.parse(user)
          }
      } catch (error) {
          console.log(error)
      }
  }

  @action login = async (payload) => {
      const response = await API(LOGIN, payload, 'post')
      if (!response.error) {
          await this._registerAuth(response.data)
          this.user = response.data
          return true
      }
      return false
  }

  /**
   * Pessiste a sessão do usuário
   * @param data dado de autenticação a ser persistido
   */
  _registerAuth = async (data) => {
      try {
          await AsyncStorage.setItem('user', JSON.stringify(data))
      } catch (error) {
          console.log(error)
      }
  }

  @action logout = async () => {
      await AsyncStorage.removeItem('user')
      this.user = null
      Toast.show({
          text: 'Sesión cerrada',
          buttonText: 'Ok',
          duration: 5000,
      })
  }

  @action changePassword = async (payload) => {
      const response = await API(CHANGE_PASSWORD, payload, 'post')
      const text = response.message
      if (!response.error) {
          Toast.show({
              text,
              buttonText: 'Ok',
              type: 'success',
              duration: 5000,
          })
      }
      return true
  }

    @action register = async (payload) => {
        const response = await API(REGISTER, payload, 'post')
        const text = response.message
        if (!response.error) {
            Toast.show({
                text,
                buttonText: 'Ok',
                type: 'success',
                duration: 5000,
            })
            return true
        }
        return false
    }

  @action forgotPassword = async (payload) => {
      const response = await API(FORGOT_PASSWORD, payload, 'post')
      const text = response.message
      if (!response.error) {
          Toast.show({
              text,
              buttonText: 'Ok',
              type: 'success',
              duration: 5000,
          })
      }
  }

  @action resetPassword = async (payload) => {
      const response = await API(RESET_PASSWORD, payload, 'post')
      const text = response.message
      if (!response.error) {
          await this._registerAuth(response.data)
          this.user = response.data
          Toast.show({
              text,
              buttonText: 'Ok',
              type: 'success',
              duration: 5000,
          })
          return true
      }
      return false
  }
}


const sessionStore = new SessionStore()
export default sessionStore
