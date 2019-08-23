import { observable, action } from 'mobx'
import API from '../utils/API'
import * as services from '../utils/constants'

class ProviderState {
    @observable providers
    @observable providerData
    @observable editMode

    constructor() {
      this.providers = []
      this.editMode = false
      this.providerData = {
        name: '',
        cnpj: '',
        representative: '',
        phone: '',
        address: '',
        email: '',
        cdCaucOtica: '',
      }
    }

    @action async getProviders(filter = {}) {
      const { data } = await API(services.PROVIDER, filter, 'get')
      if (data.error) alert(data.error.description)
      else this.providers = data.data
    }

    @action async addProvider(provider) {
      const { data } = await API(services.PROVIDER, provider, 'post')
      if (data.error) alert(data.error.description)
      else this.providers = [...this.providers, data.data]
    }

    @action async saveEdition(provider) {
      const { data } = await API(`${services.PROVIDER}?id=${provider._id}`, provider, 'put')
      if (data.error) alert(data.error.description)
      else this.getProviders()
    }

    @action async deleteProvider(id) {
      console.log(id)
      const { data } = await API(`${services.PROVIDER}?id=${id}`, null, 'delete')
      if (data.error) alert(data.error.description)
      else this.providers = this.providers.filter(item => item._id !== id)
    }
}

export default new ProviderState()
