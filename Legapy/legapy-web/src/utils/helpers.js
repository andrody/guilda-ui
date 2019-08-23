export const coinToInt = value => parseInt(value * 10e8, 10)
export const moneyToInt = value => parseInt(value * 100, 10)

export const centsToMoney = value => parseFloat(value)
export const coinToSatoshi = value => parseFloat(value / 10e8)
