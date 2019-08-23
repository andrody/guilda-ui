import React from 'react'
import { observer } from 'mobx-react/native'
import { NavigationActions } from 'react-navigation'
import { Toast, Container, Header, Left, Body, Title, Content, Right, Icon, Button, Form, Item, Label, Input, Text } from 'native-base'
// import { Icon, Button, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'
import Colors from '../../styles/Colors'
import SessionStore from '.././../stores/SessionStore'

const header = navigation => (
    <Header>
        <Left>
            <Button transparent onPress={() => navigation.navigate('CategoryNavigator')}>
                <Icon name="arrow-back" />
            </Button>
        </Left>
        <Body>
            <Title>Iniciar Sesión</Title>
        </Body>
        <Right />
    </Header>
)

@observer
export default class LoginScreen extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        header: header(navigation),
        drawerLabel: 'Iniciar Sesión',
        drawerIcon: ({ tintColor }) => <Icon name="ios-log-in" color={tintColor} />,
    })

    constructor(props) {
        super(props)
        this.state = {
            isInvalidEmail: false,
            isInvalidPassword: false,
            email: '',
            password: '',
        }
    }

    onSubmit = async () => {
        if (!this.validateFields()) {
            return
        }

        const payload = {
            Email: this.state.email,
            Password: this.state.password,
        }

        const shouldRedirect = await SessionStore.login(payload)
        if (shouldRedirect) {
            this.props.navigation.navigate('CategoryNavigator')
        }
    }

    validateFields = () => {
        let isInvalidEmail = false
        let isInvalidPassword = false
        let text = false

        if (!this.state.email) {
            isInvalidEmail = true
            text = 'E-mail incorrecto'
        }
        if (!this.state.password) {
            isInvalidPassword = true
            text = 'contraseña incorrecta'
        }
        this.setState({ isInvalidEmail, isInvalidPassword })

        if (text) {
            Toast.show({
                text,
                buttonText: 'Ok',
                type: 'danger',
                duration: 5000,
            })
            return false
        }

        return true
    }

    // _resetToForgotPassword = () => {
    //     // remove a tela de login da pilha de telas de autenticação subistituindo pela de esqueci a senha
    //     const resetAction = NavigationActions.reset({
    //         index: 0,
    //         actions: [
    //             NavigationActions.navigate({ routeName: 'ChangePasswordScreen' }),
    //         ],
    //     })
    //     this.props.navigation.dispatch(resetAction)
    //     // fim
    //     // redireciona para a tela de categorias
    // }

    render() {
        return (
            <Container style={{ backgroundColor: 'white' }}>
                <Content padder>
                    <Form>
                        <Item stackedLabel error={this.state.isInvalidEmail}>
                            <Label>Email</Label>
                            <Input
                                keyboardType="email-address"
                                onChangeText={email => this.setState({ email })}
                                onSubmitEditing={() => {
                                    this.passwordInputRef._root.focus()
                                }}
                            />
                        </Item>
                        <Item stackedLabel error={this.state.isInvalidPassword}>
                            <Label>Contraseña</Label>
                            <Input
                                ref={(r) => { this.passwordInputRef = r }}
                                secureTextEntry
                                onChangeText={password => this.setState({ password })}
                                onSubmitEditing={() => {
                                    this.onSubmit()
                                }}
                            />
                        </Item>
                    </Form>
                    <Button
                        block
                        style={{ margin: 15, marginTop: 50 }}
                        onPress={() => this.onSubmit()}
                        danger
                    >
                        <Text>Iniciar Sesión</Text>
                    </Button>
                    <Button
                        full
                        transparent
                        style={{ margin: 15 }}
                        onPress={() => this.props.navigation.navigate('Register')}
                    >
                        <Text style={{ fontSize: 12, color: Colors.primary }}>Toque aquí para crear una cuenta</Text>
                    </Button>
                    <Button
                        full
                        transparent
                        style={{ margin: 15 }}
                        onPress={() => this.props.navigation.navigate('ForgotPassword')}
                    >
                        <Text style={{ fontSize: 12, color: Colors.primary }}>Esqueceu a senha?</Text>
                    </Button>
                </Content>
            </Container>
        )
    }
}

