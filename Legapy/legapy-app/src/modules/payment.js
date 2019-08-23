import * as RNIap from 'react-native-iap'

const itemSkus = Platform.select({
    ios: [
        'mensual1',
        'anual1',
        'semestral1',
    ],
    android: [
        'mensual1',
        'anual1',
        'semestral1',
    ],
})

const getProducts = async () => {
    try {
        await RNIap.prepare()
        const products = await RNIap.getProducts(itemSkus)
        console.log(products)
        return products
    } catch (err) {
        console.warn(err) // standardized err.code and err.message available
    }
    return null
}
