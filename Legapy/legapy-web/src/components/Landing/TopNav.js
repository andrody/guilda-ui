import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { NavLink } from 'react-router-dom'
import LandingStore from '../../stores/Landing'

const logoClara = require('../../images/logo_clara.png')
const logoClara2 = require('../../images/logo_clara_2.png')

@observer
export default class TopNav extends Component {
  state = {
      hide: window.innerWidth <= 768,
      isMobile: window.innerWidth <= 768,
  }
  onToggleMenu = () => {
      this.setState({
          hide: !this.state.hide,
      })
  }
  render() {
      return (
          <div className="md-cell md-cell--12 no-marging ">
              <button onClick={() => this.onToggleMenu()} className="flex menu-container" style={{ color: this.props.location.pathname === '/' ? '#093456' : 'white' }}>
                  <i className="material-icons btn">menu</i>
              </button>
              <nav className="nav-wrapper flex" style={{ display: this.state.hide === false ? 'flex' : 'none' }}>
                  <NavLink strict exact to="/" >
                      <div className="aling-center logo">
                          <img src={this.props.location.pathname === '/' ? logoClara : logoClara2} alt="logo" />
                      </div>
                  </NavLink>
                  {
            this.state.isMobile &&
            <NavLink onClick={() => { this.state.isMobile && this.onToggleMenu() }} exact strict to="/">
                <div className="flex aling-center">
                    <div>Legapy</div>
                </div>
            </NavLink>
          }
                  <NavLink onClick={() => { this.state.isMobile && this.onToggleMenu() }} strict to="/quienes-somos">
                      <div className="flex aling-center">
                          <div>{LandingStore.languagePack[LandingStore.currentLanguage].nav.aboutUs}</div>
                      </div>
                  </NavLink>
                  <NavLink onClick={() => { this.state.isMobile && this.onToggleMenu() }} strict to="/funcionalidades">
                      <div className="flex aling-center">
                          <div>{LandingStore.languagePack[LandingStore.currentLanguage].nav.func}</div>
                      </div>
                  </NavLink>
                  <NavLink onClick={() => { this.state.isMobile && this.onToggleMenu() }} strict to="/descargue">
                      <div className="flex aling-center">
                          <div>{LandingStore.languagePack[LandingStore.currentLanguage].nav.download}</div>
                      </div>
                  </NavLink>
                  <NavLink onClick={() => { this.state.isMobile && this.onToggleMenu() }} strict to="/suporte">
                      <div className="flex aling-center">
                          <div>{LandingStore.languagePack[LandingStore.currentLanguage].nav.Support}</div>
                      </div>
                  </NavLink>
                  <NavLink onClick={() => { this.state.isMobile && this.onToggleMenu() }} strict to="/contactese">
                      <div className="flex aling-center">
                          <div>{LandingStore.languagePack[LandingStore.currentLanguage].nav.contact}</div>
                      </div>
                  </NavLink>
                  <NavLink onClick={() => { this.state.isMobile && this.onToggleMenu() }} strict to="/login">
                      <div className="flex aling-center">
                          <div>{LandingStore.languagePack[LandingStore.currentLanguage].nav.login}</div>
                      </div>
                  </NavLink>
              </nav>
          </div>
      )
  }
}
