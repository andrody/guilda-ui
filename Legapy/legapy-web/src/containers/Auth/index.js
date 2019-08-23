import React from 'react'
import { observer } from 'mobx-react'

const AuthContainer = observer(props => (
    <section {...props} className="flex login-container">
        <div className="wrapper">
            <h3 className="title">
                {props.title}
            </h3>
            <form>
                {props.children}
            </form>
        </div>
    </section>
))

export default AuthContainer