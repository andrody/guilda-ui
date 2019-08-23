import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import LayoutWrapper from "../../components/utility/layoutWrapper"
import { FullColumn } from "../../components/utility/rowColumn"

const Search = props => (
    <LayoutWrapper style={{display: 'flex', paddingLeft: 0, paddingRight: 0, width: '100%' }}>
        <FullColumn style={{flex: 1, maxWidth: 960 }} className="center-table">
            <TextField
              style={props.style}
              id="search"
              label={props.placeholder}
              type="search"
              fullWidth
              onChange={(event) => props.inputHandler(event.target.value)}
              margin="normal"
              value={props.value}
            />
        </FullColumn>
    </LayoutWrapper>
)

export default Search