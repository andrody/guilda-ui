import React, { Component } from 'react'
import { withRouter, Switch } from 'react-router-dom'
import { observer } from 'mobx-react'
import AppBar from './AppBar'
import UtilStore from '../../stores/UtilStore'
import SessionStore from '../../stores/SessionStore'
import routes from './appRouter'
import Snackbar from 'material-ui/Snackbar'
import Button from 'material-ui/Button'
import { CircularProgress } from 'material-ui/Progress'
import CategoryStore from '../../stores/CategoryStore'
import Dialog, {
    DialogActions,
    DialogContent,
    DialogTitle,
    DialogContentText,
} from 'material-ui/Dialog'

 

@withRouter
@observer
export default class App extends Component {
    async componentWillMount() {
        SessionStore.recoverSession()
    }
    render() {
        return (
            <div>
                <AppBar> 
                    <Switch>
                        {routes}
                    </Switch>
                </AppBar>
                <Snackbar
                  anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                  open={!!UtilStore.toastMessage}
                  onClose={this.handleClose}
                  style={{marginTop: 60}}
                  message={<span id="message-id">{UtilStore.toastMessage}</span>}
                  action={
                      <Button color="secondary" size="small" onClick={UtilStore.closeToast}>
                        Ok
                      </Button>
                  }
                />
                <Dialog open={!!UtilStore.dialog.open} onClose={UtilStore.dialog.onClose || (() => {})}>
                    <DialogTitle>{UtilStore.dialog.title}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {UtilStore.dialog.text}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={UtilStore.removeDialog} style={{color: '#9E9E9E'}}>
                            {UtilStore.dialog.cancelText || 'Cancelar'}
                        </Button>
                        <Button onClick={() => {
                            UtilStore.removeDialog()
                            UtilStore.dialog.onConfirm()
                        }} 
                          color="secondary" 
                          autoFocus
                        >
                            {UtilStore.dialog.confirmText || 'Confirmar'}
                        </Button>
                    </DialogActions>
                </Dialog>
                {UtilStore.loadingQueue > 0 && <div className="loading-container"><CircularProgress color="secondary" /></div>}
            </div>
        )
    }
}
