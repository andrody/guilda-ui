import React from 'react'
import { StackNavigator } from 'react-navigation'
import { Icon } from 'native-base'
import Colors from '../../styles/Colors'
import RecentScreen from '../RecentScreen'
import BookScreen from '../BookScreen'
import EditorScreen from '../EditorScreen'

const navigationOptions = {
    headerStyle: { backgroundColor: Colors.primary },
    headerTintColor: 'white',
    headerBackTitle: 'Voltar',
    drawerIcon: ({ tintColor }) => <Icon name="ios-stopwatch-outline" color={tintColor} />,
}

const Stack = StackNavigator({
    Bookmark: {
        screen: RecentScreen,
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
