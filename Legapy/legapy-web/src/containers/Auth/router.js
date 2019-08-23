// import React from 'react'
// import { Route, withRouter } from 'react-router-dom'
// import Loadable from 'react-loadable'

// const LandingComponent = (path, props) => {
//     const Component = Loadable({
//         loader: () => import(path),
//         loading() {
//             return <div>Carregando a tela...</div>
//         },
//     })
//     return <Component {...props} />
// }

// const routes = () => 
//     <div>
//         <Route
//           exact
//           path="/"
//           render={props => LandingComponent('./Home', props)}
//         />
//     </div>

// export default routes