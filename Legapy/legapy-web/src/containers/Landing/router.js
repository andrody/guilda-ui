import React from 'react'
import { Route, withRouter } from 'react-router-dom'
import Loadable from 'react-loadable'
import { CircularProgress } from 'material-ui/Progress'

const routes = [
    {
        path: '/',
        component: () => import('./Page/Home'),
    },
    {
        path: '/quienes-somos',
        component: () => import('./Page/About'),
    },
    {
        path: '/funcionalidades',
        component: () => import('./Page/Functionalities'),
    },
    {
        path: '/descargue',
        component: () => import('./Page/Download'),
    },
    {
        path: '/termsofuse',
        component: () => import('./Page/Terms'),
    },
    {
        path: '/privacy',
        component: () => import('./Page/Privacy'),
    },
    {
        path: '/suporte',
        component: () => import('./Page/Support'),
    },
    {
        path: '/contactese',
        component: () => import('./Page/Contact'),
    },
    {
        path: '/login',
        component: () => import('../Auth/Page/Login'),
    },
    {
        path: '/registro',
        component: () => import('../Auth/Page/Register'),
    },
    {
        path: '/olvide-contrasena',
        component: () => import('../Auth/Page/ForgotPassword'),
    },
    {
        path: '/restaurar-contrasena',
        component: () => import('../Auth/Page/ResetPassword'),
    },
]

const getComponent = (component, props) => {
    const Component = Loadable({
        loader: component,
        loading(props) {
            if (props.pastDelay) {
                return <div className="landing-loading"><CircularProgress color="secondary" /></div>
            }
            return <div className="landing-loading" />
        },
    })
    return <Component {...props} />
}

const landingRouter = routes.map((e, i) =>
    (<Route
      exact
      path={e.path}
      render={props => getComponent(e.component, props)}
      key={i}
    />),)

export default landingRouter
