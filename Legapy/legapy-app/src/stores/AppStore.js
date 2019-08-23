import { observable, action } from 'mobx'

class AppStore {
    @observable isLoading = false
    @observable loadingQueue = 0

    /*
    * Loading Actions
    */
    @action addLoading() {
        this.isLoading = true
        this.loadingQueue = this.loadingQueue + 1
    }

    @action subtractLoading() {
        this.loadingQueue = this.loadingQueue - 1
        if (this.loadingQueue <= 0) {
            this.loadingQueue = 0
            this.isLoading = false
        }
    }
}

export default new AppStore()
