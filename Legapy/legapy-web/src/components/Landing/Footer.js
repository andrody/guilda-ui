import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { observer } from 'mobx-react'
import LandingStore from '../../stores/Landing'

@observer
export default class Footer extends Component {
    render() {
        return (
            <footer className={this.props.location.pathname === '/' ? 'md-grid absolute' : 'md-grid'}>
                <section className="md-cell md-cell--10 footer-container flex">
                    <ul className="container">
                        <li className="wrapper">
                            <div className="title">Legapy</div>
                            <Link to="/quienes-somos">
                                <div>
                                    {LandingStore.languagePack[LandingStore.currentLanguage].nav.aboutUs}
                                </div>
                            </Link>
                        </li>
                        <li className="wrapper">
                            <Link to="/funcionalidades">
                                <div>
                                    {LandingStore.languagePack[LandingStore.currentLanguage].nav.func}
                                </div>
                            </Link>
                        </li>
                        <li className="wrapper">
                            <Link to="/descargue">
                                <div>
                                    {LandingStore.languagePack[LandingStore.currentLanguage].nav.download}
                                </div>
                            </Link>
                        </li>
                        <li className="wrapper">
                            <Link to="/suporte">
                                <div>
                                    {LandingStore.languagePack[LandingStore.currentLanguage].nav.Support}
                                </div>
                            </Link>
                        </li>
                        <li className="wrapper">
                            <Link to="/contactese">
                                <div>
                                    {LandingStore.languagePack[LandingStore.currentLanguage].nav.contact}
                                </div>
                            </Link>
                        </li>
                    </ul>
                    <ul className="container">
                        <li className="wrapper">
                            <div className="title">{LandingStore.languagePack[LandingStore.currentLanguage].nav.download}</div>
                            <a href="https://play.google.com/store/apps/details?id=com.py.pegasus.legapy&hl=es_419" rel="noopener noreferrer" target="_blank">
                                <div>
                Android
                                </div>
                            </a>
                        </li>
                        <li className="wrapper">
                            <a href="https://itunes.apple.com/py/app/legapy/id1250619827?l=en&mt=8" rel="noopener noreferrer" target="_blank">
                                <div>
                IOS
                                </div>
                            </a>
                        </li>
                    </ul>
                    <ul className="container">
                        <li className="wrapper">
                            <div className="title">{LandingStore.languagePack[LandingStore.currentLanguage].nav.contact}</div>
                            <Link to="/suporte">
                                <div>
                                    {LandingStore.languagePack[LandingStore.currentLanguage].nav.Support}
                                </div>
                            </Link>
                        </li>
                    </ul>
                </section>
            </footer>
        )
    }
}
