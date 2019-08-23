import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { observer } from 'mobx-react'
import { FullColumn } from "../../components/utility/rowColumn"
import LayoutWrapper from "../../components/utility/layoutWrapper"
import Papersheet from "../../components/utility/papersheet"
import Fade from 'material-ui/transitions/Fade'
import Zoom from 'material-ui/transitions/Zoom'
import Search from '../../components/utility/Search'
// Stores
import AppStore from '../../stores/AppStore'
import CategoryStore from '../../stores/CategoryStore'
import BookStore from '../../stores/BookStore'

@observer
class Recents extends Component {
    async componentDidMount() {
        if (CategoryStore.categories.length <= 0) {
            await CategoryStore.get()
        }
        await BookStore.getRecents(null)
        AppStore.setTitle('Favoritos')
    }

    onChange = name => event => {
        this.setState({
            [name]: event.target.value,
        })
    }

    render() {
        return (
            <LayoutWrapper style={{display: 'flex', paddingBottom: '80px'}}>
                <FullColumn style={{flex: 1, maxWidth: 960, margin: '0 auto' }} className="center-table">
                    {BookStore.recents.map(book => {
                        const path = '/app/categories/' + this.props.match.params.id + '/books/' + book.ID 
                        return(
                            <Link key={book.Name} to={path}>
                                <Papersheet  style={{marginBottom: 20}}>
                                    <div style={{fontWeight: 900}}>{book.Name}</div>
                                    <div style={{opacity: 0.7}}>{book.Description}</div>
                                </Papersheet>                
                            </Link>
                        )}
                    )}
                </FullColumn>
            </LayoutWrapper>
        )
    }
}

export default Recents