
const patchPostMessageFunction = () => {
    const originalPostMessage = window.postMessage

    const patchedPostMessage = (message, targetOrigin, transfer) => {
        originalPostMessage(message, targetOrigin, transfer)
    }

    patchedPostMessage.toString = () => String(Object.hasOwnProperty).replace('hasOwnProperty', 'postMessage')

    window.postMessage = patchedPostMessage
}

const patchPostMessageJsCode = '(' + String(patchPostMessageFunction) + ')();'

export default patchPostMessageJsCode
