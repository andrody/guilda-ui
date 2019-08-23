import { StackNavigator } from 'react-navigation'
import ChangePasswordScreen from '../auth/ChangePasswordScreen'
import Colors from '../../styles/Colors'

const navigationOptions = {
    headerStyle: { backgroundColor: Colors.primary },
    headerTintColor: 'white',
    headerBackTitle: 'Voltar',
}

const screens = {
    ChangePasswordScreen: {
        screen: ChangePasswordScreen,
        navigationOptions,
    },
}

const Auth = StackNavigator(screens)

export default Auth
