import React from 'react'
import { observer } from 'mobx-react'
import { Link } from 'react-router-dom'
import AuthContainer from '../../Auth'
import SessionStore from '../../../stores/SessionStore'
import LandingStore from '../../../stores/Landing'

@observer
export default class ResetPassword extends React.Component {
    state = {
        Email: '',
        NewPassword: '',
        RepeatedPassword: '',
        TokenReset: '',
    }

    onSend = (e) => {
        e.preventDefault()
        const model = {
            Email: this.state.Email,
            NewPassword: this.state.NewPassword,
            RepeatedPassword: this.state.RepeatedPassword,
            TokenReset: this.state.TokenReset,
        }
        SessionStore.resetPassword(model)
    }

    render() {
        return (
            <AuthContainer title={LandingStore.languagePack[LandingStore.currentLanguage].resetPassword.title}>
                <div className="form-group">
                    <label className="label" htmlFor="email-login">{LandingStore.languagePack[LandingStore.currentLanguage].resetPassword.email}</label>
                    <input onChange={(e) => { this.setState({ Email: e.target.value }) }} className="input" id="email-login" type="email" />
                </div>
                <div className="form-group">
                    <label className="label" htmlFor="new-password-login">{LandingStore.languagePack[LandingStore.currentLanguage].resetPassword.newPassword}</label>
                    <input onChange={(e) => { this.setState({ NewPassword: e.target.value }) }} className="input" id="new-password-login" type="password" />
                </div>
                <div className="form-group">
                    <label className="label" htmlFor="r-password-login">{LandingStore.languagePack[LandingStore.currentLanguage].resetPassword.RepeatedPassword}</label>
                    <input onChange={(e) => { this.setState({ RepeatedPassword: e.target.value }) }} className="input" id="r-password-login" type="password" />
                </div>
                <div className="form-group">
                    <label className="label" htmlFor="code-login">{LandingStore.languagePack[LandingStore.currentLanguage].resetPassword.Code}</label>
                    <input onChange={(e) => { this.setState({ TokenReset: e.target.value }) }} className="input" id="code-login" type="text" />
                </div>
                <div className="form-group btn-group">
                    <button onClick={e => this.onSend(e)} className="btn" type="submit">{LandingStore.languagePack[LandingStore.currentLanguage].resetPassword.btn}</button>
                </div>
            </AuthContainer>

        )
    }
}
