import React from 'react'
import { FlatList } from 'react-native'
import { Container, Header, Left, Body, Title, ListItem, Content, Right, Icon, Button, Text } from 'native-base'
import { observer } from 'mobx-react/native'
import { SearchBar } from 'react-native-elements'
import CategoryStore from '../stores/CategoryStore'
import BookStore from '../stores/BookStore'
import SessionStore from '../stores/SessionStore'

const header = (navigation) => {
    const category = navigation.state.params
    const title = category ? category.DisplayName || category.Name : null
    return (
        <Header>
            <Left>
                {category ?
                    <Button transparent onPress={() => navigation.goBack()}>
                        <Icon name="arrow-back" />
                    </Button> :
                    <Button transparent onPress={() => navigation.navigate('DrawerOpen')}>
                        <Icon name="menu" />
                    </Button>
                }
            </Left>
            <Body>
                <Title>{title || 'Categorías'}</Title>
            </Body>
            <Right />
        </Header>
    )
}

@observer
export default class CategoryScreen extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        header: header(navigation),
        drawerLabel: 'Categorías',
        drawerIcon: ({ tintColor }) => <Icon name="ios-albums-outline" color={tintColor} />,
    })

    constructor(props) {
        super(props)
        this.state = {
            searchText: '',
        }

        if (SessionStore.user) {
            BookStore.getFavorites({}, true)
        }

        CategoryStore.get()
        CategoryStore.checkLastUpdated()
    }

    onPressCategory(category) {
        if (category.HasSub) {
            this.props.navigation.navigate('Category', category)
        } else {
            this.props.navigation.navigate('Bookmark', category)
        }
    }

    render() {
        const category = this.props.navigation.state.params
        const categoriesList = CategoryStore.categories.length > 0 ?
            CategoryStore.categories
                .filter(c => (category ? c.ParentCategory === category.ID : c.ParentCategory <= 0))
            : []
        return (
            <Container style={{ backgroundColor: 'white' }}>
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
                <Content>
                    <FlatList
                        data={categoriesList}
                        keyExtractor={item => item.ID.toString()}
                        renderItem={c => (
                            <ListItem
                                onPress={() => this.onPressCategory(c.item)}
                            >
                                <Left>
                                    <Text>
                                        {c.item.DisplayName || c.item.Name}
                                    </Text>
                                </Left>
                                <Right>
                                    <Icon name="arrow-forward" />
                                </Right>
                            </ListItem>
                        )}
                    />
                </Content>
            </Container>
        )
    }
}
