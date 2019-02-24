import React, { Component } from 'react'
import { DropdownV2 as Dropdown } from 'carbon-components-react'
import PropTypes from 'prop-types'

class MatchDropdown extends Component {
  render () {
    const {
      selectMatch,
      matches,
      disabled,
      match
    } = this.props

    /**
     * TODO: add starting match as latest match in db
     */
    return (
      <Dropdown
        onChange={({ selectedItem }) => selectMatch(selectedItem)}
        selectedItem={match}
        label='Select match'
        light
        items={matches}
        itemToString={match => match.name}
        disabled={disabled}
      />
    )
  }
}

MatchDropdown.propTypes = {
  selectMatch: PropTypes.func.isRequired,
  matches: PropTypes.array.isRequired,
  disabled: PropTypes.bool.isRequired,
  match: PropTypes.object
}

export default MatchDropdown
