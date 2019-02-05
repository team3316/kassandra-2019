import React, { Component } from 'react'
import { ComboBox } from 'carbon-components-react'
import PropTypes from 'prop-types'

class MatchDropdown extends Component {
  render () {
    const {
      selectMatch,
      matches
    } = this.props

    /**
     * TODO: add starting match as latest match in db
     */
    return (
      <ComboBox
        onChange={e => selectMatch(e.selectedItem)}
        placeholder='Select match'
        items={matches}
        itemToString={match => match.name}
      />
    )
  }
}

MatchDropdown.propTypes = {
  selectMatch: PropTypes.func.isRequired,
  matches: PropTypes.array.isRequired
}

export default MatchDropdown
