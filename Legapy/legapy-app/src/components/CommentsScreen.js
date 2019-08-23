import React from 'react'
import { View, Text, StyleSheet, KeyboardAvoidingView } from 'react-native'
import { SearchBar } from 'react-native-elements'
import { Left, List, ListItem, Content, Right, Header, Button, Icon, Body, Title, Container } from 'native-base'
import moment from 'moment'
import { observer } from 'mobx-react/native'
import CommentsStore from '../stores/CommentsStore'
import Colors from '../styles/Colors'

const header = navigation => (
    <Header>
        <Left>
            <Button transparent onPress={() => navigation.goBack()}>
                <Icon name="arrow-back" />
            </Button>
        </Left>
        <Body>
            <Title>{navigation.state.params.title}</Title>
        </Body>
        <Right />
    </Header>
)

@observer
export default class Comments extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        header: header(navigation),
    })

    state = {
        commentsText: '',
    }

    componentDidMount() {
        CommentsStore.getComments(this.props.navigation.state.params.bookId)
    }

    componentWillUnmount() {
        CommentsStore.comments = []
    }

    onPlaceComment = () => {
        const model = {
            Description: this.state.commentsText,
            IDBook: this.props.navigation.state.params.bookId,
        }
        CommentsStore.addComment(model)
        this.setState({ commentsText: '' })
    }

    onDeleteComment = (comment) => {
        const model = {
            IDBook: comment.IDBook,
            IDComment: comment.ID,
        }
        CommentsStore.deleteComment(model)
    }

    render() {
        return (
            <Container style={styles.container}>
                <View style={styles.searchWrapper}>
                    <SearchBar
                        ref={(comments) => { this.comments = comments }}
                        lightTheme
                        onChangeText={value => this.setState({ commentsText: value })}
                        onSubmitEditing={() => this.onPlaceComment()}
                        value={this.state.commentsText}
                        onClearText={() => { this.comments.blur() }}
                        placeholder="Comentar"
                        inputStyle={{ backgroundColor: 'white', borderRadius: 5 }}
                        clearIcon
                        blurOnSubmit
                        noIcon
                        showLoadingIcon={false}
                        containerStyle={{ backgroundColor: '#e9e9ee', flex: 1 }}
                    />
                    <Button style={{ backgroundColor: Colors.secondary, margin: 5, marginRight: 10 }} onPress={() => this.onPlaceComment()} >
                        <Icon name="send" />
                    </Button>
                </View>
                <Content style={{ backgroundColor: 'white' }}>
                    <List
                        dataArray={CommentsStore.comments.slice()}
                        renderRow={c => (
                            <ListItem>
                                <Left>
                                    <Body>
                                        <Text>
                                            {c.Description}
                                        </Text>
                                        <Text style={{ fontSize: 10 }}>{moment(c.Created).format('DD/MM/YYYY')}</Text>
                                    </Body>
                                </Left>
                                <Right>
                                    <Button onPress={() => this.onDeleteComment(c)} transparent light danger>
                                        <Icon name="close" />
                                    </Button>
                                </Right>
                            </ListItem>
                        )}
                    />
                </Content>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: 'white',
    },
    searchWrapper: {
        backgroundColor: '#e9e9ee',
        display: 'flex',
        flexDirection: 'row',
        // paddingRight: 5,
        // marginTop: 5,
    },
})
