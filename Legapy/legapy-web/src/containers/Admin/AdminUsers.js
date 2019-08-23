import React, { Component } from 'react'
import { format } from 'date-fns'
import { observer } from 'mobx-react'
import Button from 'material-ui/Button'
import AddIcon from '@material-ui/icons/Add'
import { FullColumn } from '../../components/utility/rowColumn'
import LayoutWrapper from '../../components/utility/layoutWrapper'
import TextField from '../../components/ui/TextField'
import AdminTable from '../../components/Admin/AdminTable'
import UtilStore from '../../stores/UtilStore'
// import PageTitle from "../../components/utility/paperTitle"

// Stores
import AppStore from '../../stores/AppStore'
import UserStore from '../../stores/UserStore'

const columns = [
    {
        title: 'ID',
        dataIndex: 'ID',
    },
    {
        title: 'Email',
        dataIndex: 'Email',
        limit: 50,
    },
    {
        title: 'Admin',
        dataIndex: 'Admin',
        custom: HasSub => (HasSub ? 'Sim' : 'Não'),
    },
    {
        title: 'Plano',
        dataIndex: 'Subscriptions',
        custom: Subscriptions => (Subscriptions ? (!!Subscriptions.find(e => e.IsValid) ? Subscriptions.find(e => e.IsValid).Type : '') : ''),
    },
    {
        title: 'Data de criação',
        dataIndex: 'Created',
        custom: Created => (Created ? format(Created, 'DD/MM/YYYY') : ''),
    },
]

@observer
class AdminUsers extends Component {
    state = {
        search: '',
    }

    componentDidMount() {
        if (UserStore.users.length <= 0) {
            UserStore.get()
        }
        AppStore.setTitle('Admin - Usuários')
    }

    onChange = name => (event) => {
        this.setState({
            [name]: event.target.value,
        })
    }

    onDelete = () => {
        UtilStore.addDialog({
            title: 'Deletar Usuário',
            text: <span key="dialog-text">Não é possível deletar usuário no momento</span>,
            confirmText: 'Entendo',
            onConfirm: () => {},
        })
    }

    render() {
        const { search } = this.state
        const users = UserStore.users.filter(c => (search ? c.Email.toLocaleLowerCase().includes(search.toLocaleLowerCase()) : true))
        return (
            <LayoutWrapper style={{ display: 'flex', paddingBottom: '80px' }}>
                {/* <Button
                  color="secondary"
                  className="floating-button"
                  variant="fab"
                  onClick={() => this.props.history.push('users/create')}
                >
                    <AddIcon />
                </Button> */}
                <FullColumn style={{ flex: 1 }} className="center-table">
                    {/* <PageTitle title="Categories" data-single /> */}
                    <div style={{ width: 240, marginRight: 40 }}>
                        <TextField
                          id="name"
                          label="Buscar usuários"
                          style={{ width: '240px' }}
                          value={this.state.search}
                          onChange={this.onChange('search')}
                        />
                    </div>
                    <AdminTable
                      columns={columns}
                      onDelete={this.onDelete}
                      dataList={users}
                    />
                </FullColumn>
            </LayoutWrapper>
        )
    }
}

export default AdminUsers
