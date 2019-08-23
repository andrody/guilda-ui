import { StackNavigator } from 'react-navigation'
import Login from '../auth/LoginScreen'
import RegisterScreen from '../auth/RegisterScreen'
import ForgotPasswordScreen from '../auth/ForgotPasswordScreen'
import ResetPasswordScreen from '../auth/ResetPasswordScreen'
import Colors from '../../styles/Colors'

const navigationOptions = {
    headerStyle: { backgroundColor: Colors.primary },
    headerTintColor: 'white',
    headerBackTitle: 'Voltar',
}

const screens = {
    Login: {
        screen: Login,
        navigationOptions,
    },
    Register: {
        screen: RegisterScreen,
        navigationOptions,
    },
    ForgotPassword: {
        screen: ForgotPasswordScreen,
        navigationOptions,
    },
    ResetPasswordScreen: {
        screen: ResetPasswordScreen,
        navigationOptions,
    },
}

const Auth = StackNavigator(screens)

export default Auth
