import { observable, action, toJS } from 'mobx'
import { Alert } from 'react-native'
import differenceInDays from 'date-fns/difference_in_days'
import { SUBSCRIPTION_TYPES, SUBSCRIPTIONS } from '../constants/constants'
import API from '../utils/API'

class SubscriptionStore {
    @observable subscription = null
    @observable subscriptions = []

    @action saveSubscription = async (subscription) => {
        try {
            global.storage.save({
                key: 'Subscription',
                data: subscription,
                expires: null,
            })

            // TODO salvar no banco de dados o recibo e a data
        } catch (e) {
            console.log(e)
        }
    }

    @action loadSubscription = async () => {
        try {
            const subscription = await global.storage.load({
                key: 'Subscription',
                autoSync: true,
                syncInBackground: true,
            })

            // Se inscrição é válida retorna senão diz que expirou
            if (this.verifyValidSubscription(subscription)) {
                this.subscription = subscription
            } else {
                Alert.alert(
                    'Su suscripción ha expired',
                    'Por favor, renueve su suscripción para continuar utilizando la aplicación',
                    [
                        { text: 'Cancelar', style: 'cancel' },
                        { text: 'Ok' },
                    ],
                    { cancelable: true },
                )
            }
        } catch (err) {
            this.subscription = null
        }
        return this.subscription
    }

    @action getSubscriptions = async () => {
        const response = await API(SUBSCRIPTIONS)
        if (!response.error) {
            this.subscriptions = response.data
        }
        return this.subscriptions
    }

    @action verifyValidSubscription = (subscription) => {
        if (subscription.ID) {
            // Database subscriptions
            return differenceInDays(new Date(), new Date(subscription.Created)) <= SUBSCRIPTION_TYPES[subscription.Type]
        }
        // App Store and Play Store
        return differenceInDays(new Date(), new Date(parseInt(subscription.transactionDate, 10))) <= SUBSCRIPTION_TYPES[subscription.productId]
    }
}

export default new SubscriptionStore()
