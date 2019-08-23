import React from 'react'
import { observer } from 'mobx-react'
import { Link } from 'react-router-dom'
import AuthContainer from '../../Auth'
import SessionStore from '../../../stores/SessionStore'
import LandingStore from '../../../stores/Landing'

@observer
export default class ForgotPassword extends React.Component {
    state = {
        Email: '',
    }

    onSend = (e) => {
        e.preventDefault()
        const model = {
            Email: this.state.Email,
        }
        this.props.history.push('/restaurar-contrasena')
        SessionStore.forgotPassword(model)
    }

    render() {
        return (
            <AuthContainer style={{ marginBottom: '139px' }} title={LandingStore.languagePack[LandingStore.currentLanguage].forgotPassword.title}>
                <div className="form-group">
                    <label className="label" htmlFor="email-forgot">{LandingStore.languagePack[LandingStore.currentLanguage].forgotPassword.email}</label>
                    <input onChange={(e) => { this.setState({ Email: e.target.value }) }} className="input" id="email-forgot" type="email" />
                </div>
                <div className="form-group btn-group">
                    <button onClick={e => this.onSend(e)} className="btn" type="submit">{LandingStore.languagePack[LandingStore.currentLanguage].forgotPassword.btn}</button>
                </div>
            </AuthContainer>

        )
    }
}
