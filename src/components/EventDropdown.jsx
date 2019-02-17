import React, { Component } from 'react'
import { DropdownV2 as Dropdown } from 'carbon-components-react'
import PropTypes from 'prop-types'

/**
 * Gets eventList JSON as a prop from the blue alliance
 */
class EventDropdown extends Component {
  componentDidMount () {
    const {
      events,
      action,
      currentEventKey
    } = this.props

    action(events.find(event => event.key === currentEventKey))
  }

  render () {
    const {
      events,
      event,
      action
    } = this.props

    return (
      <Dropdown
        onChange={({ selectedItem }) => action(selectedItem)}
        titleText='Events'
        label='Event'
        light
        selectedItem={event}
        items={events}
        itemToString={event => event.name}
      />
    )
  }
}

EventDropdown.propTypes = {
  events: PropTypes.array.isRequired,
  event: PropTypes.object.isRequired,
  action: PropTypes.func.isRequired,
  currentEventKey: PropTypes.string.isRequired
}

export default EventDropdown
