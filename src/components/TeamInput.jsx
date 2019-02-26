import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { NumberInput } from 'carbon-components-react'

class TeamInput extends Component {
  render () {
    const {
      id,
      onChange,
      value
    } = this.props

    return (
      <NumberInput
        id={id}
        onChange={e => {
          const { value } = document.querySelector(`#${id}`)
          onChange(value)
        }}
        min={0}
        max={9999}
        label='Team number'
        placeholder='Enter team number'
        light
        value={value}
        invalidText='Enter a team number in range of 1-9999'
      />
    )
  }
}

TeamInput.propTypes = {
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.number.isRequired
}

export default TeamInput
