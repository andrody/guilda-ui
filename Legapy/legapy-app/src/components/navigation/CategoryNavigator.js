import { StackNavigator } from 'react-navigation'
import Colors from '../../styles/Colors'
import CategoryScreen from '../CategoryScreen'
import BookmarkScreen from '../BookmarkScreen'
import BookScreen from '../BookScreen'
import EditorScreen from '../EditorScreen'
import CommentsScreen from '../CommentsScreen'
import SearchScreen from '../SearchScreen'

const navigationOptions = {
    headerStyle: { backgroundColor: Colors.primary },
    headerTintColor: 'white',
    headerBackTitle: 'Voltar',
}

const Stack = StackNavigator({
    Category: {
        screen: CategoryScreen,
        navigationOptions,
    },
    Bookmark: {
        screen: BookmarkScreen,
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
    Comments: {
        screen: CommentsScreen,
        navigationOptions,
    },
    Search: {
        screen: SearchScreen,
        navigationOptions,
    },
})

export default Stack
