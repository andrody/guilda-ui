import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { observer } from 'mobx-react'
import { withStyles } from 'material-ui/styles'
import Button from 'material-ui/Button'
import Icon from 'material-ui/Icon'
import Tooltip from 'material-ui/Tooltip'
import TextField from 'material-ui/TextField'
import { FullColumn } from '../../../components/utility/rowColumn'
import LayoutWrapper from '../../../components/utility/layoutWrapper'
import Papersheet from '../../../components/utility/papersheet'

// Stores
import AppStore from '../../../stores/AppStore'
import SessionStore from '../../../stores/SessionStore'

const styles = theme => ({
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        // width: 200,
    },
    title: {
        marginBottom: 20,
    },
    rightIcon: {
        marginLeft: theme.spacing.unit,
    },
    button: {
        margin: theme.spacing.unit,
        marginTop: 30,
    },
})

@observer
class ChangePassword extends Component {
    state = {
        Password: '',
        NewPassword: '',
        RepeatedPassword: '',
        PasswordError: false,
        NewPasswordError: false,
        RepeatedPasswordError: false,
    }
    async componentDidMount() {
        AppStore.setTitle('Cambia la contraseña')
    }

    onSubmit = (e) => {
        e.preventDefault()
        if (!this.state.Password) {
            return this.setState({ PasswordError: true })
        } this.setState({ PasswordError: false })
        if (!this.state.NewPassword) {
            return this.setState({ NewPasswordError: true })
        } this.setState({ NewPasswordError: false })
        if (!this.state.RepeatedPassword) {
            return this.setState({ RepeatedPasswordError: true })
        } this.setState({ RepeatedPasswordError: false })

        SessionStore.ChangePassword(this.state)
    }

    handleChange = name => (event) => {
        this.setState({
            [name]: event.target.value,
        })
    }


    render() {
        const { classes } = this.props
        return (
            <LayoutWrapper style={{ display: 'flex', paddingBottom: '80px' }}>
                <FullColumn style={{ flex: 1, maxWidth: 600, margin: '0 auto' }} className="center-table">
                    <Papersheet>
                        <div className={classes.title}>
                            ¿Desea cambiar su contraseña?
                        </div>
                        <form onSubmit={this.onSubmit}>
                            <div>
                                <TextField
                                  id="with-placeholder"
                                  label="Contraseña actual"
                                  placeholder="Introduzca aquí su contraseña actual"
                                  className={classes.textField}
                                  margin="normal"
                                  onChange={this.handleChange('Password')}
                                  fullWidth
                                  required
                                  error={this.state.PasswordError}
                                />
                            </div>
                            <div>
                                <TextField
                                  id="with-placeholder"
                                  label="Nueva contraseña"
                                  placeholder="Escriba aquí su nueva contraseña"
                                  className={classes.textField}
                                  margin="normal"
                                  onChange={this.handleChange('NewPassword')}
                                  error={this.state.NewPasswordError}
                                  fullWidth
                                  required
                                />
                            </div>
                            <div>
                                <TextField
                                  id="with-placeholder"
                                  label="Repita la nueva contraseña"
                                  placeholder="Repita aquí la nueva contraseña"
                                  className={classes.textField}
                                  margin="normal"
                                  onChange={this.handleChange('RepeatedPassword')}
                                  error={this.state.RepeatedPasswordError}
                                  fullWidth
                                  required
                                />
                            </div>
                            <Button onClick={e => this.onSubmit(e)} type="submit" variant="raised" color="primary" className={classes.button}>
                                Enviar
                                <Icon className={classes.rightIcon}>send</Icon>
                            </Button>
                        </form>
                    </Papersheet>
                </FullColumn>
            </LayoutWrapper>
        )
    }
}

export default withStyles(styles)(ChangePassword)
