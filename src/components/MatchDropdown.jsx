import React, { Component } from 'react'
import { ComboBox } from 'carbon-components-react'
import PropTypes from 'prop-types'

class MatchDropdown extends Component {
  render () {
    const {
      selectMatch,
      disabled,
      match,
      matches,
      eventKey
    } = this.props

    /**
    * Items for the ComboBox
    * Practice matches support
    * Adds option 'Practice match' to enable entering a custom number
    * If the matches are an empty array, append to the first element
    */
    if (matches.length === 0) {
      matches.unshift({
        name: 'Practice 1',
        event_key: eventKey,
        key: `${eventKey}_pm1`,
        comp_level: 'PM',
        number: 1
      })
    } else if (matches[0].comp_level !== 'PM') {
      matches.unshift({
        name: 'Practice 1',
        event_key: matches[0].event_key,
        key: `${matches[0].event_key}_pm1`,
        comp_level: 'PM',
        number: 1
      })
    }
    /**
     * TODO: add starting match as latest match in db
     */
    return (
      <ComboBox
        onChange={({ selectedItem }) => selectMatch(selectedItem)}
        placeholder='Select match'
        initialSelectedItem={match != null ? match : 'nada'}
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
  match: PropTypes.object,
  eventKey: PropTypes.string.isRequired
}

export default MatchDropdown
