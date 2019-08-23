import React from 'react'
import { FlatList, View } from 'react-native'
import { observer } from 'mobx-react/native'
import { Container, Header, Left, Body, Title, List, ListItem, Content, Right, Icon, Button, Text } from 'native-base'
import { SearchBar } from 'react-native-elements'
import BookStore from '../stores/BookStore'
import Colors from '../styles/Colors'

const header = (navigation) => {
    const category = navigation.state.params
    return (
        <Header>
            <Left>
                <Button transparent onPress={() => navigation.goBack()}>
                    <Icon name="arrow-back" />
                </Button>
            </Left>
            <Body>
                <Title>{category.DisplayName || category.Name}</Title>
            </Body>
            <Right />
        </Header>
    )
}

@observer
export default class BookmarkScreen extends React.Component {
    static navigationOptions = ({ navigation }) => ({ header: header(navigation) })

    constructor(props) {
        super(props)
        this.state = {
            searchText: '',
        }
        BookStore.get({ Category: this.props.navigation.state.params.ID })
    }

    componentWillUnmount() {
        BookStore.clear()
    }

    onPressBookmark(bookmark) {
        this.props.navigation.navigate('Book', bookmark)
    }

    onGetNextPage() {
        if (BookStore.bookmarks.length < BookStore.bookmarksCount) {
            BookStore.get({
                page: Math.floor(BookStore.bookmarks.length / 50),
                Category: this.props.navigation.state.params.ID,
            }, true)
        }
    }

    render() {
        return (
            <Container style={{ backgroundColor: 'white' }}>
                <View>
                    <SearchBar
                        ref={(search) => { this.search = search }}
                        lightTheme
                        onChangeText={value => this.setState({ searchText: value })}
                        onSubmitEditing={() => this.props.navigation.navigate('Search', { query: this.state.searchText })}
                        value={this.state.searchText}
                        onClearText={() => { this.search.blur() }}
                        placeholder="Búsqueda"
                        inputStyle={{ backgroundColor: 'white', borderRadius: 5 }}
                        clearIcon
                        blurOnSubmit
                        showLoadingIcon={false}
                        containerStyle={{ backgroundColor: '#e9e9ee' }}
                    />
                    <FlatList
                        data={BookStore.bookmarks}
                        keyExtractor={item => item.ID.toString()}
                        onEndReached={() => this.onGetNextPage()}
                        onEndReachedThreshold={0.5}
                        renderItem={(elem) => {
                            const bookmark = elem.item
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
                </View>
            </Container>
        )
    }
}
