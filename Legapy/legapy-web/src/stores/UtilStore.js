import { observable, action } from 'mobx'


class UtilStore {
    @observable isFetching
    @observable isAuthenticated
    @observable toastMessage
    @observable dialog = {}
    @observable loadingQueue = 0

    constructor() {
        this.isFetching = false
        this.authenticated = false
    }

    @action authticate = () => {
        this.isAuthenticated = true
    }

    @action addToast = (message) => {
        this.toastMessage = message
        setTimeout(() => this.toastMessage = null, 4000)
    }
    
    @action closeToast = () => {
        this.toastMessage = null
    }
    
    @action addDialog = (dialog) => {
        this.dialog = {...dialog, open: true}
    }
    
    @action removeDialog = () => {
        this.dialog.open = false
        setTimeout(() => !this.dialog.open && (this.dialog = {}), 500)
    }

    @action addLoading = () => {
        this.loadingQueue += 1
    }
    
    @action subtractLoading = () => {
        this.loadingQueue -= 1
        if (this.loadingQueue < 0)
            this.loadingQueue = 0 
    }
}

const us = new UtilStore()
window.UtilStore = us
export default us
