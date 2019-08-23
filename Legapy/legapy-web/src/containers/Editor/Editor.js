import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { withStyles } from 'material-ui/styles'
import { Editor } from '@tinymce/tinymce-react'
import Button from 'material-ui/Button'
import Icon from 'material-ui/Icon'
import Tooltip from 'material-ui/Tooltip'
import BookStore from '../../stores/BookStore'
import UtilStore from '../../stores/UtilStore'

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    btnContainer: {
        [theme.breakpoints.up('md')]: {
            right: 30,
        },
        display: 'flex',
        position: 'fixed',
        flexDirection: 'column',
        bottom: 10,
        right: 9,
        zIndex: 1,
    },
    btnSaveContainer: {
        [theme.breakpoints.up('md')]: {
        },
        display: 'flex',
        position: 'fixed',
        flexDirection: 'column',
        bottom: 10,
        right: 9,

    },
})

class EditorContainer extends Component {
    state= {
        currentEdition: this.props.html,
    }

    componentWillUnmount() {
        BookStore.editMode = false
    }

    onSubmit = () => {
        UtilStore.addDialog({
            title: 'Guardar Livro',
            text: <span key="dialog-text">Deseja guardar a edição atual?</span>,
            confirmText: 'Guardar',
            onConfirm: () => {
                BookStore.saveLocalBook(this.state.currentEdition, this.props.match.params.idBook)
                BookStore.editMode = false
            },
        })
    }

    onRestoreBook = () => {
        UtilStore.addDialog({
            title: 'Restaurar Libro',
            text: <span key="dialog-text">Deseja restaurar a edição atual?</span>,
            confirmText: 'Si',
            onConfirm: () => {
                BookStore.restoreBook(this.props.match.params.idBook)
                BookStore.editMode = false
            },
        })
    }

    onCloseEditor = () => {
        UtilStore.addDialog({
            title: 'Cancelar edição atual?',
            text: <span key="dialog-text">Deseja cancelar a edição atual?</span>,
            confirmText: 'Si',
            onConfirm: () => {
                BookStore.editMode = false
            },
        })
    }

    handleEditorChange = (e) => {
        this.setState({
            currentEdition: e.target.getContent(),
        })
    }

    render() {
        const { classes } = this.props
        const that = this
        const config = {
            selector: 'textarea',
            content_style: 'td {font-size: inherit !important; border: none !important;}',
            height: window.innerHeight,
            toolbar_items_size: 'medium',
            statusbar: false,
            menubar: false,
            alignleft: { selector: 'p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table,img', classes: 'left' },
            style_formats: [{
                title: 'Bold text',
                inline: 'b',
            }],
            plugins: [
                'textcolor',
            ],
            toolbar1: 'forecolor backcolor | bold | selectFont |',
            fontsize_formats: '8pt 10pt 12pt 14pt 18pt 24pt 36pt',
            textcolor_map: [
                '000000', 'Black',
                'FFFFFF', 'White',
                'FFFF00', 'Yellow',
                '00FF00', 'Lime',
            ],
            setup(editor) {
                editor.on('keydown keyup keypress', (e) => {
                    const ua = navigator.userAgent
                    const is_native_android = (ua.indexOf('Android ') > -1)
                    /**
                     * Necessário para android
                     */
                    if (!is_native_android) {
                        e.preventDefault()
                        e.stopPropagation()
                    } else {
                        editor.undoManager.undo()
                    }
                })
                editor.addButton('selectFont', {
                    type: 'listbox',
                    text: 'Tamaño',
                    icon: false,
                    onselect(e) {
                        let fullTxt = ''
                        const content = editor.getBody().children
                        for (let i = 0; i < content.length; i++) {
                            content[i].style.fontSize = this.value()
                            let txt = ''
                            let ax = ''
                            const el = document.createElement('div')
                            el.appendChild(content[i].cloneNode(true))
                            ax = txt.indexOf('>') + 1
                            txt = txt.substring(0, ax) + content[i].innerHTML + txt.substring(ax)
                            txt = el.innerHTML
                            fullTxt += txt
                        }
                        that.setState({ currentEdition: fullTxt })
                        editor.setContent(fullTxt)
                    },
                    values: [
                        { text: '8px ', value: '8px' },
                        { text: '10px ', value: '10px' },
                        { text: '12px ', value: '12px' },
                        { text: '14px ', value: '14px' },
                        { text: '18px ', value: '18px' },
                        { text: '24px ', value: '24px' },
                        { text: '36px ', value: '36px' },
                    ],
                })
            },
        }

        return (
            <div className="editor-html">
                <Editor
                  ref={(editor) => { this.editor = editor }}
                  initialValue={this.state.currentEdition}
                  init={config}
                  onChange={this.handleEditorChange}
                />
                <div className={classes.btnContainer}>
                    <Tooltip id="tooltip-icon" title="Cancelar edição atual">
                        <Button onClick={() => this.onCloseEditor()} variant="fab" color="primary" aria-label="edit" className={classes.button}>
                            <Icon>cancel</Icon>
                        </Button>
                    </Tooltip>
                    <Tooltip id="tooltip-icon" title="Restaurar ley">
                        <Button onClick={() => this.onRestoreBook()} variant="fab" color="primary" aria-label="edit" className={classes.button}>
                            <Icon>settings_backup_restore</Icon>
                        </Button>
                    </Tooltip>
                    <Tooltip id="tooltip-icon" title="Guardar">
                        <Button onClick={() => this.onSubmit()} variant="fab" color="primary" aria-label="edit" className={classes.button}>
                            <Icon>save</Icon>
                        </Button>
                    </Tooltip>
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(EditorContainer)
