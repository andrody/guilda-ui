import React from 'react'
import { Link } from 'react-router-dom'
import onClickOutside from 'react-onclickoutside'

class DropdownMenu extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isShowing: false,
    }
  }

  handleClickOutside() {
    this.setState({
      isShowing: false,
    })
  }

  toggleDrop() {
    this.setState({
      isShowing: !this.state.isShowing,
    })
  }

  render() {
    const list = this.props.list.map((el, index) =>
      (
        <li key={index}>
          {el.action
                 ? <a onClick={() => { el.action(el); this.toggleDrop(); }}><i className={el.icon} />{el.name}</a>
                 : <Link to={el.link}><i className={el.icon} />{el.name}</Link>
                }
        </li>
      ))
    return (
      <div className={`dropdown ${this.props.classNameWrapper}`}>
        <a className={this.props.className} onClick={() => this.toggleDrop()}>{this.props.children}</a>
        <ul className={`dropdown-menu ${this.state.isShowing ? 'show' : ''}`}>
          {list}
        </ul>
      </div>
    )
  }
}

export default onClickOutside(DropdownMenu)
