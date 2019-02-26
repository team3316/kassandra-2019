import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Header extends Component {
  render () {
    const {
      color,
      children
    } = this.props

    return (
      <div className={`noselect header${color == null ? '' : ` ${color}`}`} > {children} </div>
    )
  }
}

Header.propTypes = {
  color: PropTypes.string
}

export default Header
