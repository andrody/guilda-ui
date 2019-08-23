import React from 'react'
import { Route, withRouter, Redirect } from 'react-router-dom'
import Loadable from 'react-loadable'
import { CircularProgress } from 'material-ui/Progress'
import AdminCategories from '../Admin/AdminCategories'
import AdminBooks from '../Admin/AdminBooks'
import AdminUsers from '../Admin/AdminUsers'
import EditBook from '../Admin/EditBook'
import EditCategory from '../Admin/EditCategory'
import EditUser from '../Admin/EditUser'
import CategoryRoutes from './categoryRouter'

const loadingStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    width: '100%',
}

const routes = [
    {
        path: '/app/admin/categories/create',
        Component: EditCategory,
        props: { isCreate: true },
    },
    {
        path: '/app/admin/categories/:id',
        Component: EditCategory,
    },
    {
        path: '/app/admin/books/create',
        Component: EditBook,
        props: { isCreate: true },
    },
    {
        path: '/app/admin/books/:id',
        Component: EditBook,
    },
    {
        path: '/app/admin/categories',
        Component: AdminCategories,
    },
    {
        path: '/app/admin/books',
        Component: AdminBooks,
    },
    {
        path: '/app/admin/users',
        Component: AdminUsers,
    },
    {
        path: '/app/admin/users/:id',
        Component: EditUser,
    },
    ...CategoryRoutes,
]

const getComponentAsync = (component, props) => {
    const Component = Loadable({
        loader: component,
        loading() {
            if (props.pastDelay) {
                return <div style={loadingStyle}><CircularProgress color="secondary" /></div>
            }
            return null
        },
    })
    return <Component {...props} />
}

const appRouter = routes.map((e, i) => (e.asyncComponent ?
    <Route
      exact
      path={e.path}
      render={props => getComponentAsync(e.asyncComponent, props)}
      key={i}
    />
    :
    <Route
      exact
      path={e.path}
      render={(routeProps) => {
        const props = { ...routeProps, ...e.props }
        return (<e.Component {...props} />)
      }}
      key={i}
    />))

export default appRouter
