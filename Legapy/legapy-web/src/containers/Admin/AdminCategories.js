import React, { Component } from 'react'
import { format } from 'date-fns'
import { observer } from 'mobx-react'
import Button from 'material-ui/Button'
import { FullColumn } from "../../components/utility/rowColumn"
import LayoutWrapper from "../../components/utility/layoutWrapper"
import TextField from "../../components/ui/TextField"
import AdminTable from "../../components/Admin/AdminTable"
import AddIcon from '@material-ui/icons/Add'
import UtilStore from '../../stores/UtilStore'
// import PageTitle from "../../components/utility/paperTitle"

// Stores
import AppStore from '../../stores/AppStore'
import CategoryStore from '../../stores/CategoryStore'

const columns = [
    {
        title: 'ID',
        dataIndex: 'ID',
    },
    {
        title: 'Nome',
        dataIndex: 'Name',
        limit: 50
    },
    {
        title: 'Categoria Pai',
        dataIndex: 'ParentCategory',
        custom: (ParentCategory) => ParentCategory > 0 ? ParentCategory : 'Raíz'
    },
    {
        title: 'Tem subcategorias',
        dataIndex: 'HasSub',
        custom: (HasSub) => HasSub ? 'Sim' : 'Não'
    },
    // {
    //     title: 'Livros',
    //     dataIndex: 'HasBook',
    //     custom: (HasBook) => HasBook ? 'Sim' : 'Não'
    // },
    {
        title: 'Data de criação',
        dataIndex: 'Created',
        custom: (Created) => Created ? format(Created, 'DD/MM/YYYY') : ''
    },
]

@observer
class AdminCategories extends Component {
    state = {
        search: '',
    }

    componentDidMount() {
        if (CategoryStore.categories.length <= 0) {
            CategoryStore.get()
        }
        AppStore.setTitle('Admin - Categorias')
    }

    onChange = name => event => {
        this.setState({
            [name]: event.target.value,
        })
    }

    onDelete = (id, index) => {
        UtilStore.addDialog({
            title: 'Deletar Categoria',
            text: <span key="dialog-text">Tem certeza que deseja deletar a categoria <strong key="dialog-text">{CategoryStore.categories[index].Name}</strong></span>,
            confirmText: 'Deletar',
            onConfirm: () => CategoryStore.delete(id),
        })
    }

    render() {  
        const { search } = this.state
        const categories = CategoryStore.categories.filter(c => search ? c.Name.toLocaleLowerCase().includes(search.toLocaleLowerCase()) : true)
        return (
            <LayoutWrapper style={{display: 'flex', paddingBottom: '80px'}}>
                <Button
                  color="secondary"
                  className="floating-button"
                  variant="fab"
                  onClick={() => this.props.history.push('categories/create')}
                >
                    <AddIcon />
                </Button>
                <FullColumn style={{flex: 1}} className="center-table">
                    {/* <PageTitle title="Categories" data-single /> */}
                    <div style={{width: 240, marginRight: 40}}>
                        <TextField
                          id="name"
                          label="Buscar categorias"
                          style={{width: '240px'}}
                          value={this.state.search}
                          onChange={this.onChange('search')}
                        />
                    </div>
                    <AdminTable 
                      columns={columns}
                      onDelete={this.onDelete}
                      dataList={categories}
                    />
                </FullColumn>
            </LayoutWrapper>
        )
    }
}

export default AdminCategories