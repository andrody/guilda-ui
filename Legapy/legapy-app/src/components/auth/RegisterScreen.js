import React from 'react'
import { observer } from 'mobx-react/native'
import { Toast, Container, Header, Left, Body, Title, Content, Right, Icon, Button, Form, Item, Label, Input, Text } from 'native-base'
import SessionStore from '.././../stores/SessionStore'


const header = navigation => (
    <Header>
        <Left>
            <Button transparent onPress={() => navigation.goBack()}>
                <Icon name="arrow-back" />
            </Button>
        </Left>
        <Body>
            <Title>Registro</Title>
        </Body>
        <Right />
    </Header>
)

@observer
export default class RegisterScreen extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        header: header(navigation),
    })
    constructor(props) {
        super(props)
        this.state = {
            isInvalidEmail: false,
            isInvalidPassword: false,
            isInvalidRepeatedPassword: false,
            email: '',
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
            Email: this.state.email,
            RepeatedPassword: this.state.repeatedPassword,
        }
        const success = await SessionStore.register(payload)
        if (success) {
            this.props.navigation.goBack()
        }
    }

    validateFields = () => {
        let isInvalidEmail = false
        let isInvalidPassword = false
        let isInvalidRepeatedPassword = false
        let text = false

        if (!this.state.repeatedPassword) {
            isInvalidRepeatedPassword = true
            text = 'Por favor, rellene el campo de Confirmar Contraseña'
        }
        if (!this.state.password) {
            isInvalidPassword = true
            text = 'Por favor, rellene el campo de Contraseña'
        }
        if (!this.state.email) {
            isInvalidEmail = true
            text = 'Por favor, rellene el campo de e-mail'
        }
        this.setState({ isInvalidEmail, isInvalidPassword, isInvalidRepeatedPassword })

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
                        <Item stackedLabel error={this.state.isInvalidPassword}>
                            <Label>E-mail</Label>
                            <Input
                                keyboardType="email-address"
                                onChangeText={email => this.setState({ email })}
                                onSubmitEditing={() => {
                                    this.passwordInputRef._root.focus()
                                }}
                            />
                        </Item>
                        <Item stackedLabel error={this.state.isInvalidEmail}>
                            <Label>Contraseña</Label>
                            <Input
                                secureTextEntry
                                onChangeText={password => this.setState({ password })}
                                ref={(r) => { this.passwordInputRef = r }}
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
                            <Text>Registro</Text>
                        </Button>
                    </Form>
                </Content>
            </Container>
        )
    }
}

