import React from 'react'
import { observer } from 'mobx-react'
import { Link } from 'react-router-dom'
import AuthContainer from '../../Auth'
import SessionStore from '../../../stores/SessionStore'
import LandingStore from '../../../stores/Landing'

@observer
export default class Register extends React.Component {
    state = {
        Email: '',
        Password: '',
        RepeatedPassword: '',
    }

    onSend = async (e) => {
        e.preventDefault()
        const model = {
            Email: this.state.Email,
            Password: this.state.Password,
            RepeatedPassword: this.state.RepeatedPassword,
        }
        const shouldRedirect = await SessionStore.register(model)
        if (shouldRedirect) this.props.history.push('/login')
    }

    render() {
        return (
            <AuthContainer title={LandingStore.languagePack[LandingStore.currentLanguage].register.title}>
                <div className="form-group">
                    <label className="label" htmlFor="email-login">{LandingStore.languagePack[LandingStore.currentLanguage].register.email}</label>
                    <input onChange={(e) => { this.setState({ Email: e.target.value }) }} className="input" id="email-login" type="email" />
                </div>
                <div className="form-group">
                    <label className="label" htmlFor="new-password-login">{LandingStore.languagePack[LandingStore.currentLanguage].register.password}</label>
                    <input onChange={(e) => { this.setState({ Password: e.target.value }) }} className="input" id="new-password-login" type="password" />
                </div>
                <div className="form-group">
                    <label className="label" htmlFor="r-password-login">{LandingStore.languagePack[LandingStore.currentLanguage].register.RepeatedPassword}</label>
                    <input onChange={(e) => { this.setState({ RepeatedPassword: e.target.value }) }} className="input" id="r-password-login" type="password" />
                </div>
                <div className="form-group btn-group">
                    <button onClick={e => this.onSend(e)} className="btn" type="submit">{LandingStore.languagePack[LandingStore.currentLanguage].register.btn}</button>
                </div>
            </AuthContainer>

        )
    }
}
