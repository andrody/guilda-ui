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
import BookStore from '../../stores/BookStore'
import CategoryStore from '../../stores/CategoryStore'

const columns = [
    {
        title: 'ID',
        dataIndex: 'ID',
    },
    {
        title: 'Nome',
        dataIndex: 'Name',
        limit: 50,
    },
    {
        title: 'Categoria',
        dataIndex: 'Category',
        custom: (categoryID) => {
            const cat = CategoryStore.categories.find(c => c.ID == categoryID)
            return cat ? cat.Name : ''
        },
    },
    {
        title: 'Data de criação',
        dataIndex: 'Created',
        custom: Created => (Created ? format(Created, 'DD/MM/YYYY') : ''),
    },
]

@observer
class AdminBooks extends Component {
    state = {
        search: '',
    }

    async componentDidMount() {
        if (CategoryStore.categories.length == 0) {
            await CategoryStore.get()
        }
        BookStore.get()
        AppStore.setTitle('Admin - Livros')
    }

    onChange = name => (event) => {
        this.setState({
            [name]: event.target.value,
        })
    }

    onDelete = (id, index) => {
        UtilStore.addDialog({
            title: 'Deletar Livro',
            text: <span key="dialog-text">Tem certeza que deseja deletar o livro <strong key="dialog-text">{BookStore.bookmarks[index].Name}</strong></span>,
            confirmText: 'Deletar',
            onConfirm: () => BookStore.delete(id),
        })
    }

    onSubmit = (e) => {
        e.preventDefault()
        BookStore.search(this.state.search)
    }

    render() {
        const { bookmarks } = BookStore
        return (
            <LayoutWrapper style={{ display: 'flex', paddingBottom: '80px' }}>
                <Button
                  color="secondary"
                  className="floating-button"
                  variant="fab"
                  onClick={() => this.props.history.push('books/create')}
                >
                    <AddIcon />
                </Button>
                <FullColumn style={{ flex: 1 }} className="center-table">
                    {/* <PageTitle title="Categories" data-single /> */}
                    <form onSubmit={this.onSubmit} style={{ width: 240, marginRight: 40 }}>
                        <TextField
                          id="name"
                          label="Buscar livros"
                          style={{ width: '240px' }}
                          value={this.state.search}
                          onChange={this.onChange('search')}
                        />
                    </form>
                    <AdminTable
                      columns={columns}
                      onDelete={this.onDelete}
                      dataList={bookmarks}
                      count={BookStore.bookmarksCount}
                      pullMore={() => BookStore.get({ page: Math.floor(BookStore.bookmarks.length / 50) }, true)}
                    />
                </FullColumn>
            </LayoutWrapper>
        )
    }
}

export default AdminBooks
