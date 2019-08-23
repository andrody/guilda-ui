import React from 'react'
import { Text, View, ScrollView, Alert, Linking } from 'react-native'
import { Avatar } from 'react-native-elements'
import { observer } from 'mobx-react/native'
import { Icon } from 'native-base'
import {
    DrawerNavigator,
    DrawerItems,
    NavigationActions,
} from 'react-navigation'
import Colors from '../../styles/Colors'
import CategoryNavigator from './CategoryNavigator'
import FavoritesNavigator from './FavoritesNavigator'
import RecentsNavigator from './RecentsNavigator'
import AuthNavigator from './AuthNavigator'
import ProfileNavigator from './ProfileNavigator'
import SessionStore from '../../stores/SessionStore'

const logo = require('../../../assets/lpicon.png')

const onLogout = async (navigation) => {
    await SessionStore.logout()
    navigation.navigate('AuthNavigator')
    const resetAction = NavigationActions.reset({
        index: 0,
        actions: [
            NavigationActions.navigate({ routeName: 'Login' }),
        ],
    })
    navigation.dispatch(resetAction)
}

const onSupport = async (navigation) => {
    Linking.openURL('mailto: legapy@legapy.com')
    // Alert.alert(
    //     'Soporte',
    //     'Enviar un email a legapy@pegasussa.com',
    //     [
    //         {
    //             text: 'Ok',
    //             onPress: () => {
    //                 navigation.goBack()
    //             },
    //         },
    //     ],
    //     { cancelable: true },
    // )
}

const onTermsOfUse = async (navigation) => {
    Linking.openURL('http://www.legapy.com/termsofuse')
}

const onPrivacy = async (navigation) => {
    Linking.openURL('http://www.legapy.com/privacy')
}

const CustomDrawerContentComponent = observer((props) => {
    const protectedItems = ['FavoriteNavigator', 'ProfileNavigator', 'Logout']
    const unsignedItems = ['AuthNavigator']
    return (
        <View>
            <View
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    padding: 10,
                    backgroundColor: Colors.primary,
                    paddingVertical: 20,
                    alignItems: 'center',
                }}
            >
                <Avatar
                    large
                    source={logo}
                />
                {
                    SessionStore.user &&
                    <View style={{ marginLeft: 10 }}>
                        <Text style={{ color: 'white', fontSize: 16 }}>Bienvenido</Text>
                        <Text style={{ color: 'white', fontSize: 12 }}>{SessionStore.user.Email}</Text>
                    </View>
                }
            </View>
            <ScrollView style={{ backgroundColor: 'white', height: '100%' }}>
                <DrawerItems {...props}
                    items={SessionStore.user
                        ? props.items.filter(item => unsignedItems.indexOf(item.key) === -1)
                        : props.items.filter(item => protectedItems.indexOf(item.key) === -1)
                    }
                    onItemPress={({ route, focused }) => {
                        if (route.key === 'Logout') {
                            onLogout(props.navigation)
                        } else if (route.key === 'Support') {
                            onSupport(props.navigation)
                        } else if (route.key === 'Terms') {
                            onTermsOfUse(props.navigation)
                        } else if (route.key === 'Privacy') {
                            onPrivacy(props.navigation)
                        } else {
                            props.onItemPress({ route, focused })
                        }
                    }}
                />
            </ScrollView>
        </View>
    )
})

const Drawer = DrawerNavigator(
    {
        CategoryNavigator: {
            screen: CategoryNavigator,
        },
        FavoriteNavigator: {
            screen: FavoritesNavigator,
        },
        RecentNavigator: {
            screen: RecentsNavigator,
        },
        Support: {
            screen: () => {},
            navigationOptions: {
                drawerLabel: 'Soporte',
                drawerIcon: ({ tintColor }) => <Icon name="ios-mail-outline" color={tintColor} />,
            },
        },
        Terms: {
            screen: () => {},
            navigationOptions: {
                drawerLabel: 'Terminos de uso',
                drawerIcon: ({ tintColor }) => <Icon name="ios-paper-outline" color={tintColor} />,
            },
        },
        Privacy: {
            screen: () => {},
            navigationOptions: {
                drawerLabel: 'Política de privacidad',
                drawerIcon: ({ tintColor }) => <Icon name="ios-information-circle-outline" color={tintColor} />,
            },
        },
        AuthNavigator: {
            screen: AuthNavigator,
        },
        ProfileNavigator: {
            screen: ProfileNavigator,
        },
        Logout: {
            screen: () => {},
            navigationOptions: {
                drawerLabel: 'Salir',
                drawerIcon: ({ tintColor }) => <Icon name="ios-power-outline" color={tintColor} />,
            },
        },
    },
    {
        contentComponent: CustomDrawerContentComponent,
        contentOptions: {
            activeTintColor: Colors.secondary,
            itemsContainerStyle: {
                marginVertical: 0,
            },
            iconContainerStyle: {
                opacity: 1,
            },
        },
    },
)

export default Drawer
