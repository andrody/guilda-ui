import React from 'react'

const Card = props => (
  <section className={props.className + ' card'}>
    {
        props.header && props.header
    }
    <div className={!props.noPadding ? 'card-padding full-width' : 'full-width'}>
      {
          props.children
      }
    </div>
  </section>
)

export default Card
