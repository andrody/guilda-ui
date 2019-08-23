import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { Editor } from '@tinymce/tinymce-react'
import withSelectFiles from 'react-select-files'
import { observer } from 'mobx-react'
import IconButton from 'material-ui/IconButton'
import Button from 'material-ui/Button'
import DeleteIcon from '@material-ui/icons/Delete'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import { InputLabel } from 'material-ui/Input'
import Divider from 'material-ui/Divider'
import Menu, { MenuItem } from 'material-ui/Menu'
import { FullColumn } from '../../components/utility/rowColumn'
import Papersheet from '../../components/utility/papersheet'
import LayoutWrapper from '../../components/utility/layoutWrapper'
import TextField from '../../components/ui/TextField'
import Select from '../../components/ui/Select'
import AppStore from '../../stores/AppStore'
import CategoryStore from '../../stores/CategoryStore'
import BookStore from '../../stores/BookStore'
import UtilStore from '../../stores/UtilStore'
import check from '../../utils/check'

const SelectFile = withSelectFiles('selectFiles')(({ selectFiles, onHandleFile, isEdit }) =>
    (<Button
      onClick={() => selectFiles({ accept: '/*', multiple: false }).then(files => onHandleFile(files))}
      color="primary"
        >
        Anexar Pdf
    </Button>))

const editorConfig = {
    selector: '.editor-admin-book textarea',
    height: 500,
    menubar: false,
    plugins: [
        'advlist autolink lists link charmap print preview anchor textcolor',
        'searchreplace visualblocks code fullscreen',
        'insertdatetime table contextmenu paste code help wordcount',
    ],
    toolbar: 'insert | undo redo |  formatselect | bold italic backcolor  | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help',
    content_css: [
        '//fonts.googleapis.com/css?family=Lato:300,300i,400,400i',
        '//www.tinymce.com/css/codepen.min.css'],
}

@withRouter
@observer
class EditBook extends Component {
    state = {
        errors: {},
    }

    async componentWillMount() {
        AppStore.setTitle('Edit Book')
        if (CategoryStore.categories.length == 0) {
            await CategoryStore.get()
        }

        if (this.props.match.params.id) {
            await BookStore.getBook(this.props.match.params.id)
            if (!BookStore.book.ID) {
                this.props.history.push('/app/admin/books')
            }
        }
    }

    componentWillUnmount() {
        BookStore.clear()
    }

    onSubmit = async (e) => {
        e.preventDefault()
        try {
            check(BookStore.book.Name, 'Name', 'Nome do livro é obrigatório').required()
            await BookStore.save(BookStore.book.ID, this.state.file)
            if (!this.props.match.params.id) {
                this.props.history.push('/app/admin/books')
            }
        } catch (e) {
            this.setState({ errors: { ...this.state.errors, [e.key]: e.message } })
        }
    }

    onDelete = () => {
        UtilStore.addDialog({
            title: 'Deletar Livro',
            text: <span key="dialog-text">Tem certeza que deseja deletar o livro <strong key="dialog-text">{BookStore.book.Name}</strong></span>,
            confirmText: 'Deletar',
            onConfirm: () => BookStore.delete(BookStore.book.ID, () => this.props.history.push('/app/admin/books')),
        })
    }

    onHandleFile = (files) => {
        this.setState({ file: files[0] })
        BookStore.book.HasPdf = false
    }

    onRemoveFile = () => {
        this.setState({ file: false })
        BookStore.book.HasPdf = false
    }

    handleChange = name => (event) => {
        if (event.target) {
            BookStore.book[name] = event.target.value
        } else {
            BookStore.book[name] = event
        }
    }

    render() {
        const { errors } = this.state
        const { isCreate } = this.props
        return (
            <LayoutWrapper style={{ display: 'flex' }}>
                <FullColumn style={{ flex: 1 }}>
                    <Papersheet className="center-form" >
                        <form onSubmit={this.onSubmit}>
                            <div className="control-group">
                                <TextField
                                  label="Nome do Livro"
                                  id="bookName"
                                  value={BookStore.book.Name}
                                  onChange={this.handleChange('Name')}
                                  error={errors.Name}
                                  errorText={errors.Name}
                                  required
                                  full
                                />
                                <Select
                                  label="Categoria"
                                  onChange={this.handleChange}
                                  value={BookStore.book.Category}
                                  state="Category"
                                  items={CategoryStore.categories.map(c => ({ value: c.ID, field: c.Name }))}
                                  native
                                  full
                                />
                                <TextField
                                  label="Descrição"
                                  id="bookDescription"
                                  value={BookStore.book.Description}
                                  onChange={this.handleChange('Description')}
                                  error={errors.Description}
                                  errorText={errors.Description}
                                  required
                                  multiline
                                  rows={3}
                                  full
                                />
                                <br />
                                <br />
                                <div className="editor-admin-book">
                                    <Editor
                                      value={BookStore.book.HTML}
                                      init={editorConfig}
                                      onEditorChange={this.handleChange('HTML')}
                                    />
                                </div>
                                <br />
                                <br />
                                <div className="anexar">
                                    <SelectFile onHandleFile={this.onHandleFile} isEdit={this.props.isEdit} />
                                    {(this.state.file || BookStore.book.HasPdf) &&
                                        <div className="file-selected">
                                            {BookStore.book.HasPdf ?
                                                <a
                                                  style={{ marginRight: 10 }}
                                                  href={window.location.hostname + ':3000/api/books/' + BookStore.book.ID + '/pdf'}
                                                  target="_blank"
                                                >
                                                    {'book_' + BookStore.book.ID + '.pdf'}
                                                </a> :
                                                <span style={{ marginRight: 10 }}>{this.state.file.name}</span>
                                            }
                                            <IconButton
                                              onClick={() => this.onRemoveFile()}
                                            >
                                                <DeleteIcon>delete</DeleteIcon>
                                            </IconButton>
                                        </div>
                                    }
                                    {/* {BookStore.book.HasPdf && !this.state.file ?
                                        <div className="file-selected">
                                        <span style={{ marginRight: 10 }}>{this.state.file.name}</span>
                                        <IconButton
                                          onClick={() => this.onRemoveFile()}
                                        >
                                            <DeleteIcon>delete</DeleteIcon>
                                        </IconButton>
                                    </div>
                                    } */}
                                </div>
                                <br />
                                <Divider />
                                <br />
                            </div>
                            <div className="form-actions">
                                <Button variant="raised" color="secondary" type="submit">
                                    Salvar
                                </Button>
                                {!isCreate &&
                                    <Button style={{ color: '#9E9E9E' }} onClick={this.onDelete}>
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

export default EditBook
