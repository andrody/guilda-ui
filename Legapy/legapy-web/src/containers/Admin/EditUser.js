import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { observer } from 'mobx-react'
import Button from 'material-ui/Button'
import { InputLabel } from 'material-ui/Input'
import { MenuItem } from 'material-ui/Menu'
import { FullColumn } from '../../components/utility/rowColumn'
import Papersheet from '../../components/utility/papersheet'
import LayoutWrapper from '../../components/utility/layoutWrapper'
import TextField from '../../components/ui/TextField'
import Select from '../../components/ui/Select'
import AppStore from '../../stores/AppStore'
import UserStore from '../../stores/UserStore'
import UtilStore from '../../stores/UtilStore'
import check from '../../utils/check'

const plans = [
    {
        field: 'Mensal',
        value: 'mensuallp',
    },
    {
        field: 'Semestral',
        value: 'semestrallp',
    },
    {
        field: 'Anual',
        value: 'anuallp',
    },
]

@withRouter
@observer
class EditUser extends Component {
    state = {
        errors: {},
    }

    async componentWillMount() {
        AppStore.setTitle('Edit Category')
        if (UserStore.users.length == 0) {
            await UserStore.get()
        }

        if (this.props.match.params.id) {
            UserStore.user = UserStore.users.find(c => c.ID == this.props.match.params.id) || {}
            window.user = UserStore.user
            if (!UserStore.user.ID) {
                this.props.history.push('/app/admin/users')
            }
        }
    }

    componentWillUnmount() {
        UserStore.clear()
    }

    onSubmit = async (e) => {
        e.preventDefault()
        try {
            check(UserStore.user.Email, 'Email', 'Email é obrigatório').required()
            await UserStore.save(UserStore.user.ID)
            if (!this.props.match.params.id) {
                this.props.history.push('/app/admin/users')
            }
        } catch (e) {
            this.setState({ errors: { ...this.state.errors, [e.key]: e.message } })
        }
    }

    onDelete = () => {
        UtilStore.addDialog({
            title: 'Deletar Usuário',
            text: <span key="dialog-text">Usuário não pode ser deletado</span>,
            confirmText: 'Deletar',
            onConfirm: () => {},
        })
    }

    handleChange = name => (event) => {
        UserStore.user[name] = event.target.value
    }

    handleChangeSubscription = name => (event) => {
        // const index = UserStore.user.Subscriptions.findIndex(e => e.IsValid)
        // UserStore.user.Subscriptions[index].Type = event.target.value
        // UserStore.user = { ...UserStore.user }
        if (UserStore.user.Subscriptions[0]) {
            UserStore.user.Subscriptions[0].Type = event.target.value
        } else {
            UserStore.user.Subscriptions = [{ Type: event.target.value }]
        }
    }

    render() {
        const { errors } = this.state
        const { isCreate } = this.props
        // const subscriptionActive = UserStore.user.Subscriptions.find(e => e.IsValid) || { Type: '' }
        const subType = UserStore.user.Subscriptions.length > 0 ? UserStore.user.Subscriptions[0].Type.trim() : ''
        return (
            <LayoutWrapper style={{ display: 'flex' }}>
                <FullColumn style={{ flex: 1 }}>
                    <Papersheet className="center-form" >
                        <form onSubmit={this.onSubmit}>
                            <div className="control-group">
                                <TextField
                                  label="Email"
                                  id="userEmail"
                                  value={UserStore.user.Email}
                                  type="email"
                                  onChange={this.handleChange('Email')}
                                  error={errors.Email}
                                  errorText={errors.Email}
                                  required
                                  full
                                />
                                <Select
                                  label="Plano"
                                  onChange={this.handleChangeSubscription}
                                  value={subType}
                                  state="Type"
                                  items={plans}
                                  native
                                  full
                                />
                            </div>
                            <div className="form-actions">
                                <Button variant="raised" color="secondary" type="submit">
                                    Salvar
                                </Button>
                                {/* {!isCreate &&
                                    <Button style={{ color: '#9E9E9E' }} onClick={this.onDelete}>
                                        Deletar
                                    </Button>
                                } */}
                            </div>
                        </form>
                    </Papersheet>
                </FullColumn>
            </LayoutWrapper>
        )
    }
}

export default EditUser
