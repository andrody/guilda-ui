import React from 'react'
import { withFormsy } from 'formsy-react'
import Dropzone from 'react-dropzone'

class DropzoneFiles extends React.Component {
  constructor(props) {
    super(props)
    this.changeValue = this.changeValue.bind(this)
    this.state = {
      value: true,
    }
  }

  changeValue(acceptedFiles, rejectedFiles) {
    // setValue() will set the value of the component, which in
    // turn will validate it and the rest of the form
    if (this.props.onDrop) this.props.onDrop(acceptedFiles, rejectedFiles)
    this.props.setValue(acceptedFiles)
    // console.log('Arquivos aceitos')
    // console.log(acceptedFiles)
    // console.log('Arquivos rejeitados')
    // console.log(rejectedFiles)
    if (rejectedFiles.length > 0) {
      this.props.showError()
    }
  }

  render() {
    // Set a specific className based on the validation
    // state of this component. showRequired() is true
    // when the value is empty and the required prop is
    // passed to the input. showError() is true when the
    // value typed is invalid
    const className = `form-group ${this.props.className} ${this.props.showRequired() ? 'required' : ''} ${this.props.showError() ? 'error' : ''}`
    const value = this.props.getValue()
    const errorMessage = this.props.getErrorMessage()
    return (
      <div
        className={className}
      >
        <div>{this.props.label}</div>
        <Dropzone
          multiple={false}
          accept={this.props.accept}
          onDrop={this.changeValue}
        >
          {this.props.children}
        </Dropzone>
        <span>{errorMessage}</span>
      </div>
    )
  }
}

export default withFormsy(DropzoneFiles)
