import React from 'react'
import { LayoutContentWrapper } from './layoutWrapper.style'

const layoutWrapper = props => (
    <LayoutContentWrapper
      className={
      props.className != null
        ? `${props.className} layoutContentWrapper`
        : 'layoutContentWrapper'
    }
      {...props}
      style={props.style}
    >
        {props.children}
    </LayoutContentWrapper>
)

export default layoutWrapper