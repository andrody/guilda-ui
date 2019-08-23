// Input.js
import { withFormsy } from 'formsy-react'
import React from 'react'
import * as masks from '../../utils/masks'

class MyInput extends React.Component {
  constructor(props) {
    super(props)
    this.changeValue = this.changeValue.bind(this)
  }

  changeValue(event) {
    // setValue() will set the value of the component, which in
    // turn will validate it and the rest of the form
    // Important: Don't skip this step. This pattern is required
    // for Formsy to work.
    if (this.props.date) {
      if (this.props.onChange) this.props.onChange(masks.dateOfBirthFormatter(event.currentTarget.value))
      this.props.setValue(masks.dateOfBirthFormatter(event.currentTarget.value))
    } else if (this.props.cpf) {
      if (this.props.onChange) this.props.onChange(masks.maskCpf(event.currentTarget.value))
      this.props.setValue(masks.maskCpf(event.currentTarget.value))
    } else if (this.props.money) {
      if (this.props.onChange) this.props.onChange(masks.moeda(event.currentTarget.value))
      this.props.setValue(masks.moeda(event.currentTarget.value))
    } else {
      if (this.props.onChange) this.props.onChange(event.currentTarget.value)
      this.props.setValue(event.currentTarget.value)
    }
  }

  render() {
    // An error message is returned only if the component is invalid
    const errorMessage = this.props.getErrorMessage()

    return (
      <div>
        <div>{this.props.label}</div>
        <input
          placeholder={this.props.placeholder}
          onChange={this.changeValue}
          type={this.props.type}
          value={this.props.getValue() || ''}
          disabled={this.props.disabled}
        />
        <span>{errorMessage}</span>
      </div>
    )
  }
}

export default withFormsy(MyInput)
