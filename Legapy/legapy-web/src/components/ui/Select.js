import React, { Component } from 'react'
import Input, { InputLabel } from 'material-ui/Input'
import { observer } from 'mobx-react'
import Select from 'material-ui/Select'
import { MenuItem } from 'material-ui/Menu'
import {
    FormControl,
    FormHelperText,
    FormControlLabel,
} from 'material-ui/Form'

const RenderSelectField = observer(({ label, state, className, full, items, onChange, value, native, ...props }) => {
    return (
        <FormControl className={'customControlSelect ' + (full ? 'input-full ' : ' ') + className}>
            <InputLabel htmlFor="age-simple">{label}</InputLabel>
            <Select
              value={value}
              onChange={onChange(state)}
              native={native}
              {...props}
            >
                {native
                    ? <option value=""></option>
                    : <MenuItem value=""><em></em></MenuItem>
                }
                {items.map((e, i) => native ? 
                    <option value={e.value} key={e.value + '' + i}>{e.field}</option> :
                    <MenuItem value={e.value} key={e.value}>{e.field}</MenuItem>
                )}
            </Select>
        </FormControl>
    )
})

export default RenderSelectField