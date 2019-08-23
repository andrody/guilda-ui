import React from 'react'
import { observer } from 'mobx-react'
import { Link } from 'react-router-dom'
import AuthContainer from '../../Auth'
import SessionStore from '../../../stores/SessionStore'
import LandingStore from '../../../stores/Landing'

@observer
export default class Login extends React.Component {
    state = {
        Email: '',
        Password: '',
    }

    onLogin = (e) => {
        e.preventDefault()
        const model = {
            Email: this.state.Email,
            Password: this.state.Password,
        }
        SessionStore.login(model)
    }

    render() {
        return (
            <AuthContainer title={LandingStore.languagePack[LandingStore.currentLanguage].login.title}>
                <div className="form-group">
                    <label className="label" htmlFor="email-login">{LandingStore.languagePack[LandingStore.currentLanguage].login.email}</label>
                    <input onChange={(e) => { this.setState({ Email: e.target.value }) }} className="input" id="email-login" type="email" />
                </div>
                <div className="form-group">
                    <label className="label" htmlFor="password-login">{LandingStore.languagePack[LandingStore.currentLanguage].login.password}</label>
                    <input onChange={(e) => { this.setState({ Password: e.target.value }) }} className="input" id="password-login" type="password" />
                </div>
                <div className="form-group btn-group">
                    <Link className="link" to="/olvide-contrasena">{LandingStore.languagePack[LandingStore.currentLanguage].login.link}</Link>
                    <Link className="link" to="/registro">{LandingStore.languagePack[LandingStore.currentLanguage].login.register}</Link>
                    <button onClick={e => this.onLogin(e)} className="btn" type="submit">{LandingStore.languagePack[LandingStore.currentLanguage].login.btn}</button>
                </div>
            </AuthContainer>

        )
    }
}
