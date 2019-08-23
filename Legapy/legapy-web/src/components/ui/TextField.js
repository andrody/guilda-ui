import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import {
    FormControl,
    FormHelperText,
    FormControlLabel,
} from 'material-ui/Form'

const RenderTextField = ({ error, errorText, className, full, ...props }) => {
    return (
        <FormControl className={'customControl ' + (full ? 'input-full ' : ' ') + className}>
            <TextField error={!!error} {...props} />
            {error ? <FormHelperText>{errorText}</FormHelperText> : ''}
        </FormControl>
    )
}

export default RenderTextField

