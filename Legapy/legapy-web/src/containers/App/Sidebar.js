import React from 'react'
import PropTypes from 'prop-types'
import { Link, withRouter } from 'react-router-dom'
import { observer } from 'mobx-react'
import { withStyles } from 'material-ui/styles'
import Drawer from 'material-ui/Drawer'
import Button from 'material-ui/Button'
import List, { ListItem, ListItemIcon, ListItemText, ListSubheader } from 'material-ui/List'
import Divider from 'material-ui/Divider'
import InboxIcon from '@material-ui/icons/Inbox'
import BookIcon from '@material-ui/icons/Description'

const styles = {
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
}

@withRouter
@observer
class Sidebar extends React.Component {
    toggleDrawer = (open) => () => {
        this.props.closeSidebar()
    }

    render() {
        const { classes } = this.props

        const sideList = (
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
                </List>
                <Divider />
            </div>
        )

        const fullList = (
            <div className={classes.fullList}>
                {/* <List>{sideList}</List>
                <Divider /> */}
                <List 
                  subheader={<ListSubheader component="div">Painel de administração</ListSubheader>}
                >
                    {sideList}
                </List>
            </div>
        )

        return (
            <div>
                <Drawer 
                  open={this.props.openSidebar} 
                  onClose={this.toggleDrawer(false)}
                  anchor="right"
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
            </div>
        )
    }
}

export default withStyles(styles)(Sidebar)
