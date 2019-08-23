import { observable, action } from 'mobx'
import API from '../utils/API'
import * as services from '../utils/constants'

class ProductState {
    @observable products
    @observable productData
    @observable editMode
    @observable searchIdFilter
    @observable searchIdNew
    @observable addIdModal
    @observable hasNote
    @observable noteStatus

    constructor() {
      this.products = []
      this.editMode = false
      this.noteStatus = [
        {
          label: 'Sim',
          value: 'Sim',
        },
        {
          label: 'Não',
          value: 'Não',
        },
      ]
      this.productData = {
        brandId: '',
        type: '',
        size: '',
        description: '',
        amount: '',
        buyValue: '',
        sellValue: '',
        discount: '',
        cdproduct: '',
        hasNote: 'Sim',
      }
    }

    @action async getProducts(filter = {}) {
      const { data } = await API(services.PRODUCT, filter, 'get')
      if (data.error) alert(data.error.description)
      else this.products = data.data
      console.log(data.data)
    }

    @action async addProduct(product) {
      const { data } = await API(services.PRODUCT, product, 'post')
      if (data.error) alert(data.error.description)
      else this.getProducts()
    }

    @action async saveEdition(product) {
      const { data } = await API(`${services.PRODUCT}?id=${product._id}`, product, 'put')
      if (data.error) alert(data.error.description)
      else this.getProducts()
    }

    @action async deleteProduct(id) {
      console.log(id)
      const { data } = await API(`${services.PRODUCT}?id=${id}`, null, 'delete')
      if (data.error) alert(data.error.description)
      else this.products = this.products.filter(item => item._id !== id)
    }

    @action async sellProduct(product) {
      const { data } = await API(`${services.PRODUCT}?id=${product._id}`, product, 'put')
      if (data.error) alert(data.error.description)
      else this.getProducts()
    }
}

export default new ProductState()
