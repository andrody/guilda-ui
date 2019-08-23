import React from 'react'
import { WebView, Dimensions } from 'react-native'
import { observer } from 'mobx-react/native'
import webviewFix from './webviewFix'
import Loading from '../misc/Loading'

const renderLoading = () => (<Loading />)

// startInLoadingState
const HtmlView = observer(({ source, onMessage, data }) =>
    (<WebView
        ref={(webview) => { this.webview = webview }}
        source={source}
        onMessage={event => onMessage(event.nativeEvent.data)}
        injectedJavaScript={webviewFix}
        javaScriptEnabledAndroid
        bounces={false}
        onLoad={() => {
            const { height } = Dimensions.get('window')
            return (data && this.webview.postMessage(JSON.stringify(data)))
        }}
        renderLoading={renderLoading}
    />))


export default HtmlView
