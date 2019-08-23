import React from 'react'
import { Platform, Alert } from 'react-native'
import { Container, Header, Left, Body, Title, Content, Right, Icon, Button } from 'native-base'
import HtmlView from './web/HtmlView'
import BookStore from '../stores/BookStore'

const editor = require('./web/editor.html')

const header = navigation => (
    <Header style={{ backgroundColor: '#F5F5F5' }}>
        <Left>
            <Button transparent onPress={() => navigation.goBack()}>
                <Icon name="arrow-back" style={{ color: 'black' }} />
            </Button>
        </Left>
        <Body>
            <Title style={{ color: 'black' }}>{'Editar ' + navigation.state.params.Name}</Title>
        </Body>
        <Right>
            <Button onPress={() => BookStore.deleteDraft(navigation.state.params.ID, () => navigation.goBack())} transparent>
                <Icon name="ios-trash" />
            </Button>
        </Right>
    </Header>
)

export default class EditorScreen extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        header: header(navigation),
    })

    onMessage = (payload) => {
        console.log(payload)
        const book = this.props.navigation.state.params
        Alert.alert(
            'Editor',
            '¿Desea guardar la edición actual?',
            [
                { text: 'Cancelar', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                {
                    text: 'Guardar',
                    onPress: () => {
                        BookStore.saveDraft(book.ID, payload, () => this.props.navigation.goBack())
                    },
                },
            ],
            { cancelable: true },
        )
    }
    render() {
        const book = this.props.navigation.state.params
        const device = Platform.OS === 'ios' ? 'ios' : 'android'
        return (
            <Container>
                <HtmlView
                    source={editor}
                    data={{ ...book, device }}
                    onMessage={this.onMessage}
                />
            </Container>
        )
    }
}
