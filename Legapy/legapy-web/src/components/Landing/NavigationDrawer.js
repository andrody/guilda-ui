/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react'
import { NavigationDrawer, IconSeparator } from 'react-md'
import { NavLink } from 'react-router-dom'

const navData = [
    {
        link: '/',
        title: 'Categorias',
        icon: 'dashboard',
    },
]

const navItems = navData.map(item =>
    (
        <NavLink key={item.icon} strict exact to={item.link}>
            <IconSeparator label={item.title} iconBefore>
                <i className="material-icons">{item.icon}</i>
            </IconSeparator>
        </NavLink>
    ))
const miniNavItems = navData.map(item =>
    (
        <NavLink key={item.title} strict exact to={item.link}>
            <div className="flex aling-center">
                <i className="material-icons">{item.icon}</i>
            </div>
        </NavLink>
    ))

export default class Simple extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isExpanded: false,
        }
    }
  onVisibilityChange = (value) => {
      setTimeout(() =>
          this.setState({
              isExpanded: value,
          }), 100)
  }
  render() {
      const { isExpanded } = this.state
      return (
          <NavigationDrawer
              // renderNode={renderNode}
            toolbarActions={this.props.toolbarActions}
            drawerTitle="Legapy"
            className="nav-wrapper"
            navItems={isExpanded ? navItems : []}
            extractMini
            miniDrawerChildren={miniNavItems}
            mobileDrawerType={NavigationDrawer.DrawerTypes.TEMPORARY_MINI}
            tabletDrawerType={NavigationDrawer.DrawerTypes.PERSISTENT_MINI}
            desktopDrawerType={NavigationDrawer.DrawerTypes.PERSISTENT_MINI}
            toolbarTitle="Categorias"
              // toolbarActions={<Button icon onClick={this.hide}>close</Button>}
            contentId="main-demo-content"
            contentClassName="md-grid"
            onVisibilityChange={value => this.onVisibilityChange(value)}
          >
              {this.props.children}
          </NavigationDrawer>
      )
  }
}
