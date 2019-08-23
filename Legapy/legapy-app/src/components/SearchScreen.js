import React from 'react'
import { observer } from 'mobx-react/native'
import { Container, Header, Left, Body, Title, List, ListItem, Content, Right, Icon, Button, Text, Toast } from 'native-base'
import { SearchBar } from 'react-native-elements'
import BookStore from '../stores/BookStore'
import Colors from '../styles/Colors'

const header = navigation => (
    <Header style={{ backgroundColor: '#fff' }}>
        <Left>
            <Button transparent onPress={() => navigation.goBack()}>
                <Icon name="arrow-back" style={{ color: 'black' }} />
            </Button>
        </Left>
        <Body>
            <Title style={{ color: 'black' }}>Resultados de la búsqueda</Title>
        </Body>
        <Right />
    </Header>
)

@observer
export default class SearchScreen extends React.Component {
    static navigationOptions = ({ navigation }) => ({ header: header(navigation) })

    constructor(props) {
        super(props)
        this.state = {
            searchText: props.navigation.state.params.query || '',
        }
        this.onSearch()
    }

    componentWillUnmount() {
        BookStore.searchBookmarks = []
    }

    onSearch() {
        if (this.state.searchText.length > 3) {
            BookStore.search(this.state.searchText)
        } else {
            Toast.show({
                text: 'Escriba pelo menos 3 caracteres',
                buttonText: 'Ok',
                duration: 5000,
            })
        }
    }

    onPressBookmark(bookmark) {
        this.props.navigation.navigate('Book', bookmark)
    }

    render() {
        return (
            <Container style={{ backgroundColor: 'white' }}>
                <Content>
                    <SearchBar
                        ref={(search) => { this.search = search }}
                        lightTheme
                        onChangeText={value => this.setState({ searchText: value })}
                        onSubmitEditing={() => this.onSearch()}
                        value={this.state.searchText}
                        onClearText={() => { this.search.blur() }}
                        placeholder="Búsqueda"
                        inputStyle={{ backgroundColor: 'white', borderRadius: 5 }}
                        clearIcon
                        blurOnSubmit
                        showLoadingIcon={false}
                        containerStyle={{ backgroundColor: '#F5F5F5' }}
                    />
                    <List
                        dataArray={[...BookStore.searchBookmarks]}
                        renderRow={(bookmark) => {
                            const isFavorite = !!BookStore.favorites.find(f => f.ID == bookmark.ID)

                            return (
                                <ListItem
                                    onPress={() => this.onPressBookmark(bookmark)}
                                    subtitleNumberOfLines={3}
                                >
                                    <Left>
                                        <Body>
                                            <Text>
                                                {bookmark.Name}
                                            </Text>
                                            <Text numberOfLines={3} note>
                                                {bookmark.Description}
                                            </Text>
                                        </Body>
                                    </Left>
                                    <Right>
                                        <Icon name={isFavorite ? 'ios-bookmark' : 'arrow-forward'} style={isFavorite ? { color: Colors.secondary } : {}} />
                                    </Right>
                                </ListItem>
                            )
                        }}
                    />
                </Content>
            </Container>
        )
    }
}
