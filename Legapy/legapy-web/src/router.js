import React from 'react'
import { Route, withRouter } from 'react-router-dom'
import Loadable from 'react-loadable'
import { CircularProgress } from 'material-ui/Progress'

const loadingStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    width: '100%',
} 

const routes = [
    {
        path: '/app',
        component: () => import('./containers/App')
    },
    {
        path: '/',
        component: () => import('./containers/Landing')
    },
]

const getComponent = (component, props) => {
    const Component = Loadable({
        loader: component,
        loading() {
            return <div style={loadingStyle}><CircularProgress color="secondary" /></div>
        },
    })
    return <Component {...props} />
}

const router = routes.map((e, i) => 
    <Route
      path={e.path}
      render={props => getComponent(e.component, props)}
      key={i}
    />
)

export default router
