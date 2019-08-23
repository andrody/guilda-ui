import React from 'react'
import { StackNavigator } from 'react-navigation'
import { Icon } from 'native-base'
import Colors from '../../styles/Colors'
import FavoriteScreen from '../FavoriteScreen'
import BookScreen from '../BookScreen'
import EditorScreen from '../EditorScreen'

const navigationOptions = {
    headerStyle: { backgroundColor: Colors.primary },
    headerTintColor: 'white',
    headerBackTitle: 'Voltar',
    drawerLabel: 'Favoritos',
    drawerIcon: ({ tintColor }) => <Icon name="ios-bookmark-outline" color={tintColor} />,
}

const Stack = StackNavigator({
    Bookmark: {
        screen: FavoriteScreen,
        navigationOptions,
    },
    Book: {
        screen: BookScreen,
        navigationOptions,
    },
    Editor: {
        screen: EditorScreen,
        navigationOptions,
    },
})

export default Stack
