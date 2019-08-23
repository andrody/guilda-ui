import React from 'react'
import { withStyles } from 'material-ui/styles'
import { Link, withRouter } from 'react-router-dom'
import { observer } from 'mobx-react'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import IconButton from 'material-ui/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import Menu, { MenuItem } from 'material-ui/Menu'
import UserSidebar from './UserSidebar'
import AppStore from '../../stores/AppStore'
import BookStore from '../../stores/BookStore'


const userDrawerWidth = 300

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    flex: {
        flex: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    appBar: {
        position: 'fixed',
        marginLeft: 0,
        // [theme.breakpoints.up('md')]: {
        //     marginLeft: userDrawerWidth,
        //     width: `calc(100% - ${userDrawerWidth}px)`,
        // },
    },
    navIconHide: {
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    content: {
        [theme.breakpoints.up('md')]: {
            marginLeft: userDrawerWidth,
        },
        flexGrow: 1,
        paddingTop: 64,
        // backgroundColor: theme.palette.background.default,
        // padding: theme.spacing.unit * 3,
    },
    toolbar: theme.mixins.toolbar,
})

const logo = require('../../images/logo_clara_2.png')

@withRouter
@observer
class MenuAppBar extends React.Component {
    state = {
        isOpened: null,
        anchorEl: null,
        openUserSidebar: false,
    }

    handleMenu = (event) => {
        this.setState({ anchorEl: event.currentTarget })
    }

    handleLawMenu = (event) => {
        this.setState({ isOpened: event.currentTarget })
    }

    handleUserSidebar = () => {
        this.setState({ openUserSidebar: true })
    }

    closeUserSidebar = () => {
        this.setState({ openUserSidebar: false })
    }

    handleClose = () => {
        this.setState({ anchorEl: null })
    }

    handleLawClose = () => {
        this.setState({ isOpened: null })
    }

    render() {
        const { classes, theme } = this.props
        const { anchorEl, isOpened } = this.state
        const open = Boolean(anchorEl)
        const openLawItems = Boolean(isOpened)
        const options = [
            {
                label: 'Editar',
                action: () => { BookStore.editMode = true },
            },
            {
                label: JSON.parse(localStorage.getItem('isFavorite')) ? 'Desfavoritar' : 'Favoritar',
                action: (props) => {
                    const currentBook = props.location.pathname.split('/')[5]
                    if (JSON.parse(localStorage.getItem('isFavorite'))) {
                        localStorage.setItem('isFavorite', 'false')
                        BookStore.deleteFavorite(currentBook)
                    } else {
                        localStorage.setItem('isFavorite', 'true')
                        BookStore.createFavorite(currentBook)
                    }
                },
            },
            {
                label: 'Comentario',
                action: (props) => {
                    const currentCategory = props.location.pathname.split('/')[3]
                    const currentBook = props.location.pathname.split('/')[5]
                    props.history.push(`/app/categories/${currentCategory}/books/${currentBook}/comments`)
                },
            },
        ]
        return (
            <div className={classes.root}>
                {/* <Sidebar openSidebar={this.state.openAdminSidebar} closeSidebar={this.closeAdminSidebar} /> */}
                <UserSidebar openSidebar={this.state.openUserSidebar} closeSidebar={this.closeUserSidebar} />
                <AppBar className={classes.appBar} position="static" color="primary">
                    <Toolbar>
                        <IconButton className={classes.navIconHide} color="inherit" aria-label="open drawer" onClick={this.handleUserSidebar}>
                            <MenuIcon />
                        </IconButton>

                        <Typography variant="title" color="inherit" className={classes.flex}>
                            {AppStore.title}
                        </Typography>
                        <Link to="/app/categories" style={{ flex: '1 1 10%' }}>
                            <img src={logo} alt="logo" style={{ height: '40px' }} />
                        </Link>
                        <div />
                        {
                            BookStore.onLawView &&
                            <div>
                                <IconButton
                                  aria-label="More"
                                  color="inherit"
                                  aria-owns={isOpened ? 'long-menu' : null}
                                  aria-haspopup="true"
                                  onClick={this.handleLawMenu}
                                >
                                    <MoreVertIcon />
                                </IconButton>
                                <Menu
                                  id="long-menu"
                                  anchorEl={isOpened}
                                  open={Boolean(isOpened)}
                                  onClose={this.handleLawClose}
                                >
                                    {options.map(option => (
                                        <MenuItem key={option.label}
                                          onClick={() => {
                                        this.handleLawClose()
                                        option.action(this.props)
                                    }}
                                        >
                                            {option.label}
                                        </MenuItem>
                            ))}
                                </Menu>
                            </div>
                    }
                    </Toolbar>
                </AppBar>
                <main className={classes.content}>
                    {this.props.children}
                </main>
            </div>
        )
    }
}

export default withStyles(styles)(MenuAppBar)
