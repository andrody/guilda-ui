import React from 'react'

export const Left = ({ title, description }) => (
  <div className="left">
    <h3 className="left-title">
      {title}
    </h3>
    <div className="left-text">
      {description}
    </div>
  </div>
)
export const Right = ({ title, description }) => (
  <div className="right">
    <h3 className="right-title">
      {title}
    </h3>
    <div className="right-text">
      {description}
    </div>
  </div>
)


export default class LandingBody extends React.Component {
  render() {
    return (
      <section className="body-container">
        <h2 className="title">
          {this.props.title}
        </h2>
        {
          this.props.children &&
          <div className="description">
            {this.props.children}
          </div>
        }
        <div>
          {this.props.footer}
        </div>
      </section>
    )
  }
}
