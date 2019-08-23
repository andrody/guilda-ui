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
class Categories extends Component {
    state = {
        search: '',
    }
    async componentWillMount() {
        if (CategoryStore.categories.length <= 0) {
            await CategoryStore.get()
        }

        AppStore.setTitle('Categorias')
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

    render() {
        const { classes } = this.props
        const { id } = this.props.match.params
        const categories = CategoryStore.categories.filter(e => (id ? e.ParentCategory == id : true))
        return (
            <LayoutWrapper style={{ display: 'flex', paddingBottom: '80px' }}>
                <FullColumn style={{ flex: 1, maxWidth: 960, margin: '0 auto' }} className="center-table">
                    <form className="flex" onSubmit={this.onSearch}>
                        <Search inputHandler={this.onChange} placeholder="Escriba aquí para buscar una ley" />
                        <Button onClick={e => this.onSearch(e)} className={classes.button} variant="fab" color="primary">
                            <Icon className={classes.rightIcon}>send</Icon>
                        </Button>
                    </form>
                    {categories.map((category, index) => {
                        const path = '/app/categories/' + category.ID + '/' + (category.HasSub ? '' : 'books')
                        return (
                            <Link key={category.Name + '' + index} to={path}>
                                <Papersheet style={{ marginBottom: 20 }}>
                                    <div>{category.Name}</div>
                                </Papersheet>
                            </Link>
                        )
})}
                </FullColumn>
            </LayoutWrapper>
        )
    }
}

export default withStyles(styles)(Categories)
