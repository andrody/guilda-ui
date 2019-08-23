import React from 'react'
import { observer } from 'mobx-react/native'
import { NavigationActions } from 'react-navigation'
// import { Icon, Button, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'
import { Toast, Container, Header, Left, Body, Title, Content, Right, Icon, Button, Form, Item, Label, Input, Text } from 'native-base'

import Colors from '../../styles/Colors'
import SessionStore from '.././../stores/SessionStore'


const header = navigation => (
    <Header>
        <Left>
            <Button transparent onPress={() => navigation.goBack()}>
                <Icon name="arrow-back" />
            </Button>
        </Left>
        <Body>
            <Title>Olvidé la contraseña</Title>
        </Body>
        <Right />
    </Header>
)

@observer
export default class ResetPasswordScreen extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        header: header(navigation),
        drawerLabel: 'Olvidé la contraseña',
        drawerIcon: ({ tintColor }) => <Icon name="ios-lock" color={tintColor} />,
    })

    constructor(props) {
        super(props)
        this.state = {
            isInvalidnewPassword: false,
            isInvalidRepeatedPassword: false,
            isInvalidToken: false,
            newPassword: '',
            repeatedPassword: '',
            token: '',
        }
    }

    onSubmit = async () => {
        if (!this.validateFields()) {
            return
        }
        const payload = {
            Email: this.props.navigation.state.params.email,
            NewPassword: this.state.newPassword,
            RepeatedPassword: this.state.repeatedPassword,
            TokenReset: this.state.token,
        }
        const shouldRedirect = await SessionStore.resetPassword(payload)
        if (shouldRedirect) {
            this._resetToForgotPassword()
            this.props.navigation.navigate('Login')
        }
    }

    _resetToForgotPassword = () => {
        // remove a tela de login da pilha de telas de autenticação subistituindo pela de esqueci a senha
        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'Login' }),
            ],
        })
        this.props.navigation.dispatch(resetAction)
        // fim
        // redireciona para a tela de categorias
    }

    validateFields = () => {
        let isInvalidnewPassword = false
        let isInvalidRepeatedPassword = false
        let isInvalidToken = false
        let text = false

        if (!this.state.newPassword) {
            isInvalidnewPassword = true
            text = 'Por favor, rellene el campo de nueva contraseña'
        }
        if (!this.state.repeatedPassword) {
            isInvalidRepeatedPassword = true
            text = 'contraseña incorrecta'
        }
        if (!this.state.token) {
            isInvalidToken = true
            text = 'Por favor, rellene el campo de código'
        }

        this.setState({ isInvalidnewPassword, isInvalidRepeatedPassword, isInvalidToken })

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

    render() {
        return (
            <Container style={{ backgroundColor: 'white' }}>
                <Content padder>
                    <Form>
                        <Item stackedLabel error={this.state.isInvalidToken}>
                            <Label>Código enviado al e-mail</Label>
                            <Input
                                onChangeText={token => this.setState({ token })}
                                onSubmitEditing={() => {
                                    this.newPasswordInputRef._root.focus()
                                }}
                            />
                        </Item>
                        <Item stackedLabel error={this.state.isInvalidnewPassword}>
                            <Label>Nueva Contraseña</Label>
                            <Input
                                secureTextEntry
                                onChangeText={newPassword => this.setState({ newPassword })}
                                ref={(r) => { this.newPasswordInputRef = r }}
                                onSubmitEditing={() => {
                                    this.passwordConfirmInputRef._root.focus()
                                }}
                            />
                        </Item>
                        <Item stackedLabel error={this.state.isInvalidRepeatedPassword}>
                            <Label>Confirmar seña</Label>
                            <Input
                                secureTextEntry
                                onChangeText={repeatedPassword => this.setState({ repeatedPassword })}
                                ref={(r) => { this.passwordConfirmInputRef = r }}
                                onSubmitEditing={() => {
                                    this.onSubmit()
                                }}
                            />
                        </Item>
                        <Button danger block style={{ margin: 15, marginTop: 50 }} onPress={() => this.onSubmit()}>
                            <Text>Restaurar contraseña</Text>
                        </Button>
                    </Form>
                </Content>
            </Container>
        )
    }
}

