import React, { Component } from 'react'
import { observer } from 'mobx-react'
import moment from 'moment'
import Icon from 'material-ui/Icon'
import { withStyles } from 'material-ui/styles'
import Button from 'material-ui/Button'
import IconButton from 'material-ui/IconButton'
import Menu, { MenuItem } from 'material-ui/Menu'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import { FullColumn } from '../../components/utility/rowColumn'
import LayoutWrapper from '../../components/utility/layoutWrapper'
import Papersheet from '../../components/utility/papersheet'
import Search from '../../components/utility/Search'

// Stores
import AppStore from '../../stores/AppStore'
import CommentsStore from '../../stores/CommentsStore'

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

const options = [
    {
        label: 'Borrar',
        action: (IDBook, IDComment) => {
            CommentsStore.deleteComment({ IDBook, IDComment })
        },
    },
]

@observer
class Comments extends Component {
    state = {
        comment: '',
        anchorEl: null,
    }

    componentDidMount() {
        AppStore.setTitle('Comentários')
        const { idBook } = this.props.match.params
        CommentsStore.getComments(idBook)
    }

    handleClick = (event) => {
        this.setState({ anchorEl: event.currentTarget })
    }

    handleClose = () => {
        this.setState({ anchorEl: null })
    }

    onAddComment = (comment) => {
        this.setState({
            comment,
        })
    }

    onSubmit = (e) => {
        e.preventDefault()
        const { idBook } = this.props.match.params
        const payload = {
            IDBook: idBook,
            Description: this.state.comment,
        }
        CommentsStore.addComment(payload)
        this.setState({
            comment: '',
        })
    }

    render() {
        const { classes } = this.props
        const comments = CommentsStore.comments
        const { anchorEl } = this.state
        return (
            <LayoutWrapper style={{ display: 'flex', paddingBottom: '80px' }}>
                <FullColumn style={{ flex: 1, maxWidth: 960, margin: '0 auto' }} className="center-table">
                    <form className="flex" onSubmit={this.onSubmit}>
                        <Search style={{ flex: 1 }} placeholder="Añadir comentario" value={this.state.comment} inputHandler={this.onAddComment} />
                        <Button onClick={e => this.onSubmit(e)} className={classes.button} variant="raised" color="primary">
                            <Icon className={classes.rightIcon}>send</Icon>
                        </Button>
                    </form>
                    {comments.map((comment, index) => (
                        <Papersheet key={comment.Description + comment.ID} style={{ marginBottom: 20 }}>
                            <div className="flex">
                                <div>
                                    <div>{comment.Description}</div>
                                    <div>{moment(comment.Created).format('DD/MM/YYYY')}</div>
                                </div>
                                <IconButton
                                  style={{ marginLeft: 'auto' }}
                                  aria-label="More"
                                  aria-owns={anchorEl ? 'long-menu' : null}
                                  aria-haspopup="true"
                                  onClick={this.handleClick}
                                >
                                    <MoreVertIcon />
                                </IconButton>
                                <Menu
                                  id="long-menu"
                                  anchorEl={anchorEl}
                                  open={Boolean(anchorEl)}
                                  onClose={this.handleClose}
                                >
                                    {options.map(option => (
                                        <MenuItem key={comment.ID}
                                          onClick={() => {
                                                const { idBook, id } = this.props.match.params
                                                this.handleClose()
                                                option.action(idBook, comment.ID)
                                            }}
                                        >
                                            {option.label}
                                        </MenuItem>
                                        ))}
                                </Menu>
                            </div>
                        </Papersheet>
                        ))}
                </FullColumn>
            </LayoutWrapper>
        )
    }
}

export default withStyles(styles)(Comments)
