import axios from 'axios'
import UtilStore from '../stores/UtilStore'
import SessionStore from '../stores/SessionStore'

const API = async (url, method = 'get', data, customHeaders, noLoading) => {
    if (!noLoading) {
        UtilStore.addLoading()
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
            data,
            headers,
            params: method === 'get' ? { ...data } : {},
        })
    } catch (e) {
        if (!noLoading) {
            UtilStore.subtractLoading()
        }
        console.log(e.message)
        if (e.message === 'Network Error') {
            UtilStore.addToast('Servidor está fora do ar')
            return { error: 'Servidor está fora do ar' }
        }
        if (e.response && e.response.data) {
            payload = e.response
        } else {
            return { error: e.message }
        }
    }

    console.log("payload.data *********************")
    console.log(payload.data)
    if (payload.data.error) {
        UtilStore.addToast(payload.data.error.description || 'Erro no servidor')
    }

    if (!noLoading) {
        UtilStore.subtractLoading()
    }
    document.body.style.overflow = 'auto'

    return payload.data
}

export default API
