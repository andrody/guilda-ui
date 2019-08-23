import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { observer } from 'mobx-react'
import Button from 'material-ui/Button'
import { InputLabel } from 'material-ui/Input'
import { MenuItem } from 'material-ui/Menu'
import { FullColumn } from "../../components/utility/rowColumn"
import Papersheet from "../../components/utility/papersheet"
import LayoutWrapper from "../../components/utility/layoutWrapper"
import TextField from "../../components/ui/TextField"
import Select from "../../components/ui/Select"
import AppStore from '../../stores/AppStore'
import CategoryStore from '../../stores/CategoryStore'
import UtilStore from '../../stores/UtilStore'
import check from '../../utils/check'

@withRouter
@observer
class EditCategory extends Component {
    state = {
        errors: {}
    }

    async componentWillMount() {
        AppStore.setTitle('Edit Category')
        if (CategoryStore.categories.length == 0) {
            await CategoryStore.get()
        }

        if (this.props.match.params.id) {
            CategoryStore.category = CategoryStore.categories.find(c => c.ID == this.props.match.params.id) || {}
            if (!CategoryStore.category.ID) {
                this.props.history.push('/app/admin/categories')
            }
        }
    }

    componentWillUnmount() {
        CategoryStore.clear()
    }

    handleChange = name => event => {
        CategoryStore.category[name] = event.target.value
    }

    onSubmit = async (e) => {
        e.preventDefault()
        try {
            check(CategoryStore.category.Name, 'Name', 'Nome da categoria é obrigatório').required()
            await CategoryStore.save(CategoryStore.category.ID)
            if (!this.props.match.params.id) {
                this.props.history.push('/app/admin/categories')
            }
        } catch (e) {
            this.setState({errors: {...this.state.errors, [e.key]: e.message}})
        }
    }

    onDelete = () => {
        UtilStore.addDialog({
            title: 'Deletar Categoria',
            text: <span key="dialog-text">Tem certeza que deseja deletar a categoria <strong key="dialog-text">{CategoryStore.category.Name}</strong></span>,
            confirmText: 'Deletar',
            onConfirm: () => CategoryStore.delete(CategoryStore.category.ID, () => this.props.history.push('/app/admin/categories')),
        })
    }

    render() {  
        const { errors } = this.state
        const { isCreate } = this.props
        
        return (
            <LayoutWrapper style={{display: 'flex'}}>
                <FullColumn style={{flex: 1}}>
                    <Papersheet className="center-form" >
                        <form onSubmit={this.onSubmit}>
                            <div className="control-group">
                                <TextField
                                  label="Nome da categoria"
                                  id="categoryName"
                                  value={CategoryStore.category.Name}
                                  onChange={this.handleChange('Name')}
                                  error={errors.Name}
                                  errorText={errors.Name}
                                  required
                                  full
                                />
                                <TextField
                                  label="Nome de visualização"
                                  id="displayName"
                                  value={CategoryStore.category.DisplayName}
                                  onChange={this.handleChange('DisplayName')}
                                  full
                                />
                                <Select 
                                  label="Categoria Pai"
                                  onChange={this.handleChange}
                                  value={CategoryStore.category.ParentCategory || ''}
                                  state="ParentCategory"
                                  items={CategoryStore.categories.filter(item => item.ID != CategoryStore.category.ID ).map(c => ({value: c.ID, field: c.Name}))}
                                  native
                                  full
                                />
                            </div>
                            <div className="form-actions">
                                <Button variant="raised" color="secondary" type="submit">
                                    Salvar
                                </Button>
                                {!isCreate && 
                                    <Button style={{color: '#9E9E9E'}} onClick={this.onDelete}>
                                        Deletar
                                    </Button>
                                }
                            </div>
                        </form>
                    </Papersheet>                    
                </FullColumn>
            </LayoutWrapper>
        )
    }
}

export default EditCategory