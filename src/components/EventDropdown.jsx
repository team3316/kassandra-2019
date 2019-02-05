import React, { Component } from 'react'
import { ComboBox } from 'carbon-components-react'
import PropTypes from 'prop-types'

/**
 * Gets eventList JSON as a prop from the blue alliance
 */
class EventDropdown extends Component {
  componentDidMount () {
    const {
      getMatches,
      currentEventKey
    } = this.props

    getMatches(currentEventKey)
  }

  render () {
    const {
      events,
      getMatches,
      currentEventKey
    } = this.props

    return (
      <ComboBox
        onChange={e => getMatches(e.selectedItem.key)}
        placeholder='Select event'
        initialSelectedItem={events.find(event => event.key === currentEventKey)}
        items={events}
        itemToString={event => event.name}
      />
    )
  }
}

EventDropdown.propTypes = {
  events: PropTypes.array.isRequired,
  getMatches: PropTypes.func.isRequired,
  currentEventKey: PropTypes.string.isRequired
}

export default EventDropdown
