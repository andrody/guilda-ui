import { observable, action } from 'mobx'
import API from '../utils/API'
import * as services from '../utils/constants'

class BrandState {
    @observable brands
    @observable brandData
    @observable editMode
    @observable searchIdFilter
    @observable addIdModal

    constructor() {
      this.brands = []
      this.editMode = false
      this.brandData = {
        name: '',
        providerId: '',
      }
    }

    @action async getBrands(filter = {}) {
      const { data } = await API(services.BRAND, filter, 'get')
      if (data.error) alert(data.error.description)
      else this.brands = data.data
      console.log(data.data)
    }

    @action async addBrand(brand) {
      const { data } = await API(services.BRAND, brand, 'post')
      if (data.error) alert(data.error.description)
      else this.getBrands()
    }

    // @action async saveEdition(brand) {
    //   const { data } = await API(`${services.brand}?id=${brand._id}`, brand, 'put')
    //   if (data.error) alert(data.error.description)
    //   else this.getbrands()
    // }

    @action async deleteBrand(id) {
      console.log(id)
      const { data } = await API(`${services.BRAND}?id=${id}`, null, 'delete')
      if (data.error) alert(data.error.description)
      else this.brands = this.brands.filter(item => item._id !== id)
    }
}

export default new BrandState()
