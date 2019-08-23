import React from 'react'
import { observer } from 'mobx-react/native'
import { Container, Header, Left, Body, Title, List, ListItem, Content, Right, Icon, Button, Text } from 'native-base'
import { SearchBar } from 'react-native-elements'
import BookStore from '../stores/BookStore'
import Colors from '../styles/Colors'

const header = navigation => (
    <Header>
        <Left>
            <Button transparent onPress={() => navigation.navigate('CategoryNavigator')}>
                <Icon name="arrow-back" />
            </Button>
        </Left>
        <Body>
            <Title>Favoritos</Title>
        </Body>
        <Right />
    </Header>
)

@observer
export default class FavoriteScreen extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        header: header(navigation),
        drawerLabel: 'Favoritos',
    })

    constructor(props) {
        super(props)

        BookStore.getFavorites()
    }

    onPressBookmark(bookmark) {
        this.props.navigation.navigate('Book', bookmark)
    }

    render() {
        return (
            <Container style={{ backgroundColor: 'white' }}>
                <Content>
                    <List
                        dataArray={[...BookStore.favorites]}
                        renderRow={bookmark => (
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
                                    <Icon name="ios-bookmark" style={{ color: Colors.secondary }} />
                                </Right>
                            </ListItem>
                        )}
                    />
                </Content>
            </Container>
        )
    }
}
