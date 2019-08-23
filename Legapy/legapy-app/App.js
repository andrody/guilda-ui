import React from 'react'
import Storage from 'react-native-storage'
import { View, AsyncStorage } from 'react-native'
import { Root, Container, StyleProvider } from 'native-base'
import Expo from 'expo'
import { observer } from 'mobx-react/native'
import Drawer from './src/components/navigation/DrawerNavigator'
import SessionStore from './src/stores/SessionStore'
import AppStore from './src/stores/AppStore'
import Loading from './src/components/misc/Loading'
import getTheme from './native-base-theme/components'
import platform from './native-base-theme/variables/platform'

const storage = new Storage({
    // maximum capacity, default 1000
    size: 6000,
    storageBackend: AsyncStorage,

    // expire time, default 1 day(1000 * 3600 * 24 milliseconds).
    // can be null, which means never expire.
    defaultExpires: null,
    enableCache: true,

    // if data was not found in storage or expired,
    // the corresponding sync method will be invoked and return
    // the latest data.
    sync: {
        // we'll talk about the details later.
    },
})
global.storage = storage

@observer
export default class App extends React.Component {
    state = {
        isReady: false,
    }

    async componentWillMount() {
        await SessionStore.recoverSession()
        await Expo.Font.loadAsync({
            Roboto: require('native-base/Fonts/Roboto.ttf'),
            Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
            Ionicons: require('native-base/Fonts/Ionicons.ttf'),
        })
        this.setState({ isReady: true })
    }

    render() {
        const { isReady } = this.state
        if (!isReady) {
            return <Expo.AppLoading />
        }
        return (
            <Root>
                <StyleProvider style={getTheme(platform)}>
                    <Container>
                        {/* <StatusBar barStyle="light-content" /> */}
                        <Drawer />
                        {AppStore.isLoading &&
                        <View style={{
                            position: 'absolute',
                            justifyContent: 'center',
                            alignContent: 'center',
                            width: '100%',
                            height: '100%',
                        }}
                        >
                            <Loading />
                        </View>
                        }
                    </Container>
                </StyleProvider>
            </Root>
        )
    }
}

