import React from 'react'
import PropTypes from 'prop-types'
import { Link, withRouter } from 'react-router-dom'
import { observer } from 'mobx-react'
import { withStyles } from 'material-ui/styles'
import Drawer from 'material-ui/Drawer'
import Button from 'material-ui/Button'
import StarIcon from '@material-ui/icons/Star'
import NewsIcon from '@material-ui/icons/NewReleases'
import ChangeIcon from '@material-ui/icons/Autorenew'
import Exit from '@material-ui/icons/ExitToApp'
import List, { ListItem, ListItemIcon, ListItemText, ListSubheader } from 'material-ui/List'
import Divider from 'material-ui/Divider'
import InboxIcon from '@material-ui/icons/Inbox'
import BookIcon from '@material-ui/icons/Description'
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount'
import Hidden from 'material-ui/Hidden'

import SessionStore from '../../stores/SessionStore'

const drawerWidth = 300

const styles = theme => ({
    list: {
        width: drawerWidth,
    },
    fullList: {
        width: 'auto',
    },
    drawerPaper: {
        width: drawerWidth,
        [theme.breakpoints.up('md')]: {
            position: 'relative',
        },
    },
})

@withRouter
@observer
class UserSidebar extends React.Component {
    toggleDrawer = open => () => {
        this.props.closeSidebar()
    }

    onSignOut = () => {
        SessionStore.logout()
        this.props.history.push('/login')
    }

    render() {
        const { classes } = this.props

        const admSideList = (
            <div className={classes.list}>
                <List>
                    <ListItem button onClick={() => this.props.history.push('/app/admin/categories')}>
                        <ListItemIcon>
                            <InboxIcon />
                        </ListItemIcon>
                        <ListItemText primary="Categorias" />
                    </ListItem>
                    <ListItem button onClick={() => this.props.history.push('/app/admin/books')}>
                        <ListItemIcon>
                            <BookIcon />
                        </ListItemIcon>
                        <ListItemText primary="Livros" />
                    </ListItem>
                    <ListItem button onClick={() => this.props.history.push('/app/admin/users')}>
                        <ListItemIcon>
                            <SupervisorAccountIcon />
                        </ListItemIcon>
                        <ListItemText primary="Usuários" />
                    </ListItem>
                </List>
                <Divider />
            </div>
        )
        const sideList = (
            <div className={classes.list}>
                <List>
                    <ListItem button onClick={() => this.props.history.push('/app/categories')}>
                        <ListItemIcon>
                            <InboxIcon />
                        </ListItemIcon>
                        <ListItemText primary="Categorias" />
                    </ListItem>

                    <ListItem button onClick={() => this.props.history.push('/app/favorites')}>
                        <ListItemIcon>
                            <StarIcon />
                        </ListItemIcon>
                        <ListItemText primary="Favoritos" />
                    </ListItem>

                    <ListItem button onClick={() => this.props.history.push('/app/news')}>
                        <ListItemIcon>
                            <NewsIcon />
                        </ListItemIcon>
                        <ListItemText primary="Recientes" />
                    </ListItem>

                    <ListItem button onClick={() => this.props.history.push('/app/change-password')}>
                        <ListItemIcon>
                            <ChangeIcon />
                        </ListItemIcon>
                        <ListItemText primary="Cambia la contraseña" />
                    </ListItem>

                    <ListItem button onClick={() => this.onSignOut()}>
                        <ListItemIcon>
                            <Exit />
                        </ListItemIcon>
                        <ListItemText primary="Finalizar la sesión" />
                    </ListItem>

                </List>
            </div>
        )

        const fullList = (
            <div className={classes.fullList}>
                {/* <List>{sideList}</List>
                <Divider /> */}
                {SessionStore.user.Admin ?
                    <List
                      subheader={<ListSubheader component="div">Painel de administração</ListSubheader>}
                    >
                        {admSideList}
                    </List>
                    : <div />
                 }
                <List
                  subheader={
                      <ListSubheader component="div">
                          {`Bienvenido ${SessionStore.user.Email}`}
                      </ListSubheader>}
                >
                    {sideList}
                </List>
            </div>
        )

        return (
            <div>
                <Hidden mdUp>
                    <Drawer
                      open={this.props.openSidebar}
                      onClose={this.toggleDrawer(false)}
                      anchor="left"
                      variant="temporary"
                      ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                      }}
                    >
                        <div
                          tabIndex={0}
                          role="button"
                          onClick={this.toggleDrawer(false)}
                          onKeyDown={this.toggleDrawer(false)}
                        >
                            {fullList}
                        </div>
                    </Drawer>
                </Hidden>
                <Hidden smDown implementation="css">
                    <Drawer
                      open
                      anchor="left"
                      variant="permanent"
                      className="sidebar"
                    >
                        <div
                          tabIndex={0}
                          role="button"
                          onClick={this.toggleDrawer(false)}
                          onKeyDown={this.toggleDrawer(false)}
                        >
                            {fullList}
                        </div>
                    </Drawer>
                </Hidden>
            </div>
        )
    }
}

export default withStyles(styles)(UserSidebar)
