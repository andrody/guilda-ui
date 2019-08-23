import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { observer } from 'mobx-react'
import Icon from 'material-ui/Icon'
import Button from 'material-ui/Button'
import { withStyles } from 'material-ui/styles'
import { FullColumn } from '../../components/utility/rowColumn'
import LayoutWrapper from '../../components/utility/layoutWrapper'
import Papersheet from '../../components/utility/papersheet'
import Search from '../../components/utility/Search'
// Stores
import AppStore from '../../stores/AppStore'
import CategoryStore from '../../stores/CategoryStore'
import BookStore from '../../stores/BookStore'

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
        alignSelf: 'center',
        padding: 16,
    },

    iconSmall: {
        fontSize: 20,
    },
})

@observer
class Bookmarks extends Component {
    state = {
        page: 0,
    }
    async componentDidMount() {
        const catId = this.props.match.params.id
        if (CategoryStore.categories.length <= 0) {
            await CategoryStore.get()
        }

        await BookStore.getFavorites(null)

        if (!this.props.location.search) {
            await BookStore.get({ Category: this.props.match.params.id })
        } else {
            await BookStore.search(this.props.location.search)
        }

        AppStore.setTitle(CategoryStore.categories.find(c => c.ID == catId).Name)
        this.onScroll()
    }

    onChange = name => (event) => {
        this.setState({
            [name]: event.target.value,
        })
    }

    onScroll = () => {
        window.addEventListener('scroll', this.getNextBookmarkPage)
    }

    onChange = (search) => {
        this.setState({ search })
    }

    onSearch = (e) => {
        if (this.state.search) {
            e.preventDefault()
            this.props.history.push(`/app/categories/1/books?query=${this.state.search}&onlyDescription=true`)
        }
    }

    getNextBookmarkPage = () => {
        const h = document.documentElement
        const b = document.body
        const st = 'scrollTop'
        const sh = 'scrollHeight'
        // console.log(((h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight)) * 100)
        const currentHeightPercentage = ((h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight)) * 100
        if (currentHeightPercentage === 100) {
            this.setState(state => ({ page: state.page + 1 }), async () => {
                if (!this.props.location.search) {
                    await BookStore.get({ page: this.state.page }, true)
                } else {
                    await BookStore.search(this.props.location.search + `&page=${this.state.page}`, true)
                }
            })
        }
    }

    render() {
        const { classes } = this.props
        return (
            <LayoutWrapper style={{ display: 'flex', paddingBottom: '80px' }}>
                <FullColumn style={{ flex: 1, maxWidth: 960, margin: '0 auto' }} className="center-table">
                    <form className="flex" onSubmit={this.onSearch}>
                        <Search inputHandler={this.onChange} placeholder="Escriba aquí para buscar una ley" />
                        <Button onClick={e => this.onSearch(e)} className={classes.button} variant="fab" color="primary">
                            <Icon className={classes.rightIcon}>send</Icon>
                        </Button>
                    </form>
                    {BookStore.bookmarks.map((book) => {
                        const isFavorite = !!BookStore.favorites.find(f => f.ID == book.ID)
                        const path = '/app/categories/' + this.props.match.params.id + '/books/' + book.ID
                        return (
                            <Link onClick={() => {
                                if (isFavorite) {
                                    localStorage.setItem('isFavorite', 'true')
                                } else {
                                    localStorage.setItem('isFavorite', 'false')
                                }
                            }}
                              key={book.Name + book.ID}
                              to={path}
                            >
                                <Papersheet style={{ marginBottom: 20 }}>
                                    <div style={{ fontWeight: 900 }}>{book.Name}{isFavorite &&
                                    <Icon style={{
                                        color: '#ef4023', margin: 0, padding: 0, marginLeft: 5, lineHeight: 'inherit',
                                    }}
                                    >bookmark
                                    </Icon>}
                                    </div>
                                    <div style={{ opacity: 0.7 }}>{book.Description}</div>
                                </Papersheet>
                            </Link>
                        )
 })}
                </FullColumn>
            </LayoutWrapper>
        )
    }
}

export default withStyles(styles)(Bookmarks)
