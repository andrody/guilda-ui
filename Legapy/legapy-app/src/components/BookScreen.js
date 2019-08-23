import React from 'react'
import { observer } from 'mobx-react/native'
import { View } from 'react-native'
import { Container, Header, Left, Body, Title, Content, Right, Button, Icon, ActionSheet, Text, Toast } from 'native-base'
import BookStore from '../stores/BookStore'
import SessionStore from '../stores/SessionStore'
import HtmlView from './web/HtmlView'
import Colors from '../styles/Colors'
import Payment from './payment/Payment'

const bookHtml = require('./web/book.html')

@observer
export default class BookScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        const isFavorite = !!BookStore.favorites.find(f => f.ID == navigation.state.params.ID)
        const book = navigation.state.params
        return ({
            header: (
                <Header>
                    <Left>
                        <Button transparent onPress={() => navigation.goBack()}>
                            <Icon name="arrow-back" />
                        </Button>
                    </Left>
                    <Body>
                        <Title>{navigation.state.params.Name}</Title>
                    </Body>
                    <Right>
                        <Button transparent
                            onPress={() => {
                                if (SessionStore.user) {
                                    if (isFavorite) {
                                        BookStore.deleteFavorite(book)
                                        BookStore.favorites = BookStore.favorites.filter(f => f.ID !== book.ID)
                                    } else {
                                        BookStore.createFavorite(book)
                                        BookStore.favorites = [...BookStore.favorites, book]
                                        Toast.show({
                                            text: 'You favored ' + book.Name,
                                            buttonText: 'Ok',
                                            duration: 3000,
                                        })
                                    }
                                } else {
                                    Toast.show({
                                        text: 'Es necesario iniciar sesión para favorecer',
                                        buttonText: 'Ok',
                                        type: 'danger',
                                        duration: 3000,
                                    })
                                }
                                navigation.setParams(book)
                            }}
                        >
                            <Icon name={isFavorite ? 'ios-bookmark' : 'ios-bookmark-outline'} style={isFavorite ? { color: Colors.secondary } : {}} />
                        </Button>
                        <Button onPress={() => book.onActionSheet()} transparent>
                            <Icon name="more" />
                        </Button>
                    </Right>
                </Header>),
        })
    }

    constructor(props) {
        super(props)
        const protectedItems = ['Comentario']

        this.state = {
            actions: [
                { text: 'Editar', icon: 'ios-create-outline', index: 0 },
                { text: 'Comentario', icon: 'ios-chatbubbles-outline', index: 1 },
                { text: 'Descargar PDF', icon: 'ios-cloud-download-outline', index: 2 },
                { text: 'Cancelar', icon: 'ios-close', index: 3 },
            ].filter(item => SessionStore.user || protectedItems.indexOf(item.text) === -1),
        }

        props.navigation.setParams({
            ...props.navigation.state.params,
            onActionSheet: this.onActionSheet,
        })
    }

    async componentWillMount() {
        await BookStore.getBook(this.props.navigation.state.params.ID)
        this.setState({
            actions: this.state.actions.filter(item => item.index !== 2 || (item.index === 2 && BookStore.book.HasPdf)),
        })
    }

    componentWillUnmount() {
        BookStore.clearBook()
    }

    onMessage = (payload) => {
        console.log(payload)
    }

    onActions = (index) => {
        switch (this.state.actions[index].index) {
        case 0: // EDITAR
            this.props.navigation.navigate('Editor', BookStore.book)
            break
        case 1: // COMENTARIO
            this.props.navigation.navigate('Comments', { title: 'Comentarios', bookId: this.props.navigation.state.params.ID })
            break
        case 2: // DESCARREGAR PDF
            BookStore.getPdf(this.props.navigation.state.params.ID)
            break
        case 3: // CANCELAR
            break
        default:
            break
        }
    }

    onActionSheet = () => {
        ActionSheet.show(
            {
                options: this.state.actions,
                cancelButtonIndex: 3,
                title: 'Más opciones',
            },
            this.onActions,
        )
    }

    render() {
        return (
            <Container style={{ backgroundColor: 'white' }}>
                <Payment goBack={this.props.navigation.goBack} />
                {BookStore.book &&
                    <HtmlView
                        source={bookHtml}
                        data={BookStore.book}
                        onMessage={this.onMessage}
                    />
                }
            </Container>
        )
    }
}
