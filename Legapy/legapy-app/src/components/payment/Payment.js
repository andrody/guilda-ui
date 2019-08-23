import React from 'react'
import { observer } from 'mobx-react/native'
import { Alert, Platform } from 'react-native'
import * as RNIap from 'react-native-iap'
import SubscriptionStore from '../../stores/SubscriptionStore'
import PayModalIOS from './PayModalIOS'
import SessionStore from '../../stores/SessionStore'
import { SUBSCRIPTION_TYPES } from '../../constants/constants'
import { Container, Header, Left, Body, Title, Content, Right, Button, Icon, ActionSheet, Text, Toast } from 'native-base'

const itemSkus = Platform.select({
    ios: [
        'mensual1',
        'anual1',
        'semestral1',
    ],
    android: [
        'mensuallp',
        'anuallp',
        'semestrallp',
    ],
})

@observer
export default class Payment extends React.Component {
    state = {
        products: [],
        showPayModalInfo: false,
        product: {},
    }

    async componentWillMount() {
        try {
            const subscription = await SubscriptionStore.loadSubscription()
            if (!subscription) {
                await RNIap.prepare()
                const purchases = await this.getPurchases()
                const validPurchase = purchases.find(p => SubscriptionStore.verifyValidSubscription(p))
                if (validPurchase) {
                    SubscriptionStore.saveSubscription(validPurchase)
                } else if (SessionStore.user) {
                    const subscriptions = await SubscriptionStore.getSubscriptions()
                    const validSubscription = subscriptions.find(s => SubscriptionStore.verifyValidSubscription(s))
                    if (!validSubscription) {
                        this.getSubscriptionsForSale()
                    }
                } else {
                    this.getSubscriptionsForSale()
                }
            }
        } catch (err) {
            console.warn(err)
        }
    }

    async componentWillUnmount() {
        try {
            await RNIap.endConnection()
        } catch (err) {
            // console.warn(err)
        }
    }

    onActionSheet = (actions) => {
        ActionSheet.show(
            {
                options: actions,
                cancelButtonIndex: 3,
                title: 'Firmar un plan para visualizar la ley',
            },
            (buttonIndex) => {
                switch (buttonIndex) {
                case 3: // CANCELAR
                    this.props.goBack()
                    break
                default:
                    // if (Platform.OS === 'ios') {
                    //     this.onSeePlanInfo(this.state.products[buttonIndex])
                    // } else {
                    // }
                    this.onBuy(this.state.products[buttonIndex])
                    break
                }
            },
        )
    }

    onSeePlanInfo = async (product) => {
        this.setState({ showPayModalInfo: true, product })
    }

    onBuy = async (product) => {
        try {
            const purchase = await RNIap.buySubscription(product.productId)
            SubscriptionStore.saveSubscription(purchase)
            Alert.alert(
                'Parabenos, plan comprado con éxito!',
                'Usted ahora tiene ' + SUBSCRIPTION_TYPES[purchase.productId] + ' días para usar la aplicación',
                [{ text: 'Ok' }],
                { cancelable: true },
            )
            console.log(purchase)
        } catch (err) {
            this.props.goBack()
            console.log(err)
        }
    }

    getPurchases = async () => {
        try {
            const purchases = await RNIap.getAvailablePurchases()
            console.log(purchases)
            return purchases
        } catch (err) {
            console.warn(err) // standardized err.code and err.message available
        }
        return []
    }

    getSubscriptionsForSale = async () => {
        try {
            const products = await RNIap.getSubscriptions(itemSkus)
            // const products = [{
            //     title: 'Mensal', price: 10, localizedPrice: 20, description: 'acesso por 30 dias',
            // }, {
            //     title: 'Anual', price: 15, localizedPrice: 25, description: 'acesso por 30 dias',
            // }]
            this.setState({ products })
            console.log(products)
            const actions = products
                .sort((a, b) => parseFloat(a.price) - parseFloat(b.price))
                .map((p, i) => ({
                    text: Platform.OS === 'ios' ? `${p.title} ${p.localizedPrice}` :
                        (
                            <Text style={{ justifyContent: 'space-between' }}>
                                <Text style={{ flex: 1 }}>{p.description}</Text>
                                <Text style={{ color: 'green' }}>{(i ? '    ' : '      ') + p.localizedPrice}</Text>
                            </Text>
                        ),
                    icon: 'ios-card',
                }))
            this.onActionSheet(Platform.OS === 'ios' ? [...actions, { icon: 'ios-card', text: 'Cancelar' }] : actions)
        } catch (err) {
            console.warn(err) // standardized err.code and err.message available
        }
    }

    render() {
        const { showPayModalInfo } = this.state
        if (showPayModalInfo) {
            return (<PayModalIOS
                visibleModal={showPayModalInfo}
                product={this.state.product}
                onCancel={() => {
                    this.setState({ showPayModalInfo: false, product: {} })
                    this.props.goBack()
                }}
                onContinue={() => {
                    this.setState({ showPayModalInfo: false })
                    this.onBuy(this.state.product)
                }}
            />)
        }
        return null
    }
}
