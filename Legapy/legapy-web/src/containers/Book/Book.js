import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { observer } from 'mobx-react'
import { withStyles } from 'material-ui/styles'
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser'
import Button from 'material-ui/Button'
import Icon from 'material-ui/Icon'
import Tooltip from 'material-ui/Tooltip'
import { FullColumn } from "../../components/utility/rowColumn"
import LayoutWrapper from "../../components/utility/layoutWrapper"
import Papersheet from "../../components/utility/papersheet"
import Editor from '../Editor/Editor'

// Stores
import AppStore from '../../stores/AppStore'
import CategoryStore from '../../stores/CategoryStore'
import BookStore from '../../stores/BookStore'

const styles = theme => ({

})

@observer
class Book extends Component {

    async componentDidMount() {
        BookStore.onLawView = true
        await BookStore.getBook(this.props.match.params.idBook)
        AppStore.setTitle(BookStore.book.Name)
    }
    
    componentWillUnmount() {
        BookStore.onLawView = false
    }

    render() {  
        const { classes } = this.props
        const book = BookStore.book
        const html = book.HTML ? book.HTML.replace(/<\s*a[^>]*>(.*?)/g, "<span>").replace(/<\s*\/s*a>/g, "</span>") : ''
        return (
            <LayoutWrapper style={{display: 'flex', paddingBottom: '80px'}}>
                <FullColumn style={{flex: 1, maxWidth: 961, margin: '0 auto' }} className="center-table">
                    {
                    BookStore.editMode ?
                        <Editor ref={(editor) => { this.editor = editor }} onSaveBook={this.onSaveBook} {...this.props} html={html}></Editor>
                    :
                        <div>
                            <Papersheet>
                                <div>{book.Name}</div>
                                <div>{book.Description}</div>
                            </Papersheet>   
                            <Papersheet>
                                { ReactHtmlParser(html) }
                            </Papersheet>   
                        </div>
                }
                </FullColumn>
            </LayoutWrapper>
        )
    }
}

export default withStyles(styles)(Book)