import React, { Component } from 'react'

/**
 * Gets eventList JSON as a prop from the blue alliance
 */
export default class EventDropdown extends Component {
  componentDidMount () {
    const { events, getMatches } = this.props

    getMatches(events[0].key)
  }

  render () {
    const { events, getMatches } = this.props

    return (
      <div>
        <select onChange={e => getMatches(e.target.value)} >
          {events.map(event => (
            <option value={event.key} key={event.key}> {event.name} </option>
          ))}
        </select>
      </div>
    )
  }
}
