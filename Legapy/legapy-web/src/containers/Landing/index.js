import React, { Component } from 'react'
import { Route, withRouter, Redirect } from 'react-router-dom'
import { observer } from 'mobx-react'
import { MenuButton, ListItem } from 'react-md'
import SessionStore from '../../stores/SessionStore'
import LandingStore from '../../stores/Landing'
import TopNav from '../../components/Landing/TopNav'
import Footer from '../../components/Landing/Footer'
import landingRouter from './router'

@withRouter
@observer
export default class Landing extends Component {
    constructor(props) {
        super(props)
        SessionStore.recoverSession()
    }
    render() {
        const toolbarActions =
        (
            <MenuButton
              id="menu-button-2"
              icon
              menuItems={[
                  <ListItem key={1} onClick={() => console.log('sair')} primaryText="Salir" />,
                ]}
              centered
              anchor={{
                    x: MenuButton.HorizontalAnchors.BOTTOM || 'left',
                    y: MenuButton.VerticalAnchors.BOTTOM,
                }}
                >
                more_vert
            </MenuButton>
        )
        if (SessionStore.user) {
            return <Redirect to="/app/categories" />
        }
        return (
            <section className="md-grid no-padding no-margin">
                <header className={`md-cell md-cell--12 flex ${this.props.location.pathname === '/' ? 'header' : 'dark-header'} no-margin full-width`}>
                    <div className="md-grid md-cell--10 no-padding">
                        <TopNav {...this.props} />
                    </div>
                </header>
                <div className="md-cell md-cell--12 wrapper-lang">
                    <div className={`md-cell md-cell--10 ${this.props.location.pathname === '/' ? 'switch-lang' : 'switch-lang-dark'}`}>
                        <span>
                            <a
                              onClick={() => LandingStore.changeLanguage('ES')}
                              className={LandingStore.currentLanguage === 'ES' ? 'active' : ''}
                            >
                                    ES
                            </a>|
                            <a
                              onClick={() => LandingStore.changeLanguage('PT')}
                              className={LandingStore.currentLanguage === 'PT' ? 'active' : ''}
                            >
                                    PT
                            </a>|
                            <a
                              onClick={() => LandingStore.changeLanguage('EN')}
                              className={LandingStore.currentLanguage === 'EN' ? 'active' : ''}
                            >
                                    EN
                            </a>
                        </span>
                    </div>
                </div>
                <div className="md-cell md-cell--12 no-margin full-width">
                    {landingRouter}
                </div>
                <Footer {...this.props} />

            </section>
        )
    }
}
