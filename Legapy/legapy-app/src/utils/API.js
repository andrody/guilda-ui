import axios from 'axios'
import { Alert } from 'react-native'
import { Toast } from 'native-base'
import SessionStore from '../stores/SessionStore'
import AppStore from '../stores/AppStore'

// : {
//     Accept: 'application/json',
//     'Content-Type': 'multipart/form-data',

axios.defaults.adapter = require('axios/lib/adapters/xhr')
// }
const API = async (url, data, method = 'get', customHeaders, noLoading) => {
    if (!noLoading) {
        AppStore.addLoading()
    }

    let headers = {
        'Content-Type': 'application/json',
        token: SessionStore.user ? SessionStore.user.Token : '',
    }

    if (customHeaders) {
        headers = {
            ...headers,
            ...customHeaders,
        }
    }

    let payload
    try {
        payload = await axios({
            method,
            url,
            data: method === 'get' ? null : data,
            headers,
            params: method === 'get' ? { ...data } : {},
        })
    } catch (e) {
        if (e.message === 'Network Error') {
            AppStore.subtractLoading()

            Toast.show({
                text: 'Error de conexión. Compruebe su internet',
                buttonText: 'Ok',
                duration: 9000,
                type: 'danger',
            })

            return {
                error: {
                    title: 'Error de conexión',
                    description: 'Su conexión está mal o no está conectado a Internet, compruebe su conexión.',
                },
            }
        }
        if (e.response && e.response.data) {
            payload = e.response
        }
    }

    if (payload.data.error && !noLoading) {
        Toast.show({
            text: payload.data.error.description || 'Erro no servidor',
            buttonText: 'Ok',
            duration: 5000,
        })
        // Alert.alert(payload.data.message || 'Erro no servidor', payload.data.error.description || 'Erro no servidor')
    }

    if (!noLoading) {
        AppStore.subtractLoading()
    }

    return payload.data
}

export default API
