import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Footer extends Component {
  render () {
    const {
      children
    } = this.props

    return (
      <div className='footer'> {children} </div>
    )
  }
}

Footer.propTypes = {
}

export default Footer
