import React from 'react'
import { observer } from 'mobx-react/native'
import { NavigationActions } from 'react-navigation'
// import { Icon, Button, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'
import { Toast, Container, Header, Left, Body, Title, Content, Right, Icon, Button, Form, Item, Label, Input, Text } from 'native-base'

import SessionStore from '.././../stores/SessionStore'

const header = navigation => (
    <Header>
        <Left>
            <Button transparent onPress={() => navigation.navigate('CategoryNavigator')}>
                <Icon name="arrow-back" />
            </Button>
        </Left>
        <Body>
            <Title>Cambia la contraseña</Title>
        </Body>
        <Right />
    </Header>
)

@observer
export default class ChangePasswordScreen extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        header: header(navigation),
        drawerLabel: 'Cambia la contraseña',
        drawerIcon: ({ tintColor }) => <Icon name="ios-unlock-outline" color={tintColor} />,
    })

    constructor(props) {
        super(props)
        this.state = {
            isInvalidnewPassword: false,
            isInvalidPassword: false,
            isInvalidRepeatedPassword: false,
            newPassword: '',
            password: '',
            repeatedPassword: '',
        }
    }

    onSubmit = async () => {
        if (!this.validateFields()) {
            return
        }
        const payload = {
            Password: this.state.password,
            NewPassword: this.state.newPassword,
            RepeatedPassword: this.state.repeatedPassword,
        }
        await SessionStore.changePassword(payload)
        this.props.navigation.navigate('CategoryNavigator')
    }

    validateFields = () => {
        let isInvalidnewPassword = false
        let isInvalidPassword = false
        let isInvalidRepeatedPassword = false
        let text = false

        if (!this.state.newPassword) {
            isInvalidnewPassword = true
            text = 'Por favor, rellene el campo de nueva contraseña'
        }
        if (!this.state.repeatedPassword) {
            isInvalidRepeatedPassword = true
            text = 'contraseña incorrecta'
        }
        if (!this.state.password) {
            isInvalidPassword = true
            text = 'contraseña incorrecta'
        }
        this.setState({ isInvalidnewPassword, isInvalidPassword, isInvalidRepeatedPassword })

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
                        <Item stackedLabel error={this.state.isInvalidnewPassword}>
                            <Label>Senha actual</Label>
                            <Input
                                secureTextEntry
                                onChangeText={password => this.setState({ password })}
                                onSubmitEditing={() => {
                                    this.newPasswordInputRef._root.focus()
                                }}
                            />
                        </Item>
                        <Item stackedLabel error={this.state.isInvalidPassword}>
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
                            <Text>Actualizar contraseña</Text>
                        </Button>
                    </Form>
                </Content>
            </Container>
        )
    }
}

