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
export default class ForgotPasswordScreen extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        header: header(navigation),
        drawerLabel: 'Olvidé la contraseña',
        drawerIcon: ({ tintColor }) => <Icon name="ios-lock" color={tintColor} />,
    })

    constructor(props) {
        super(props)
        this.state = {
            isInvalidEmail: false,
            email: '',
        }
    }

    onSubmit = () => {
        if (!this.validateFields()) {
            return
        }
        const payload = {
            Email: this.state.email,
        }
        SessionStore.forgotPassword(payload)
        this.props.navigation.navigate('ResetPasswordScreen', { email: this.state.email })
    }

    validateFields = () => {
        let isInvalidEmail = false
        let text = false

        if (!this.state.email) {
            isInvalidEmail = true
            text = 'Por favor, rellene el campo de e-mail'
        }
        this.setState({ isInvalidEmail })

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
                        <Item stackedLabel error={this.state.isInvalidEmail}>
                            <Label>E-mail</Label>
                            <Input
                                onChangeText={email => this.setState({ email })}
                                onSubmitEditing={() => {
                                    this.onSubmit()
                                }}
                            />
                        </Item>
                        <Button danger block style={{ margin: 15, marginTop: 50 }} onPress={() => this.onSubmit()}>
                            <Text>Enviar e-mail</Text>
                        </Button>
                    </Form>
                </Content>
            </Container>
        )
    }
}

