import React, { Component } from 'react'
import EventDropdown from './EventDropdown.jsx'
import PropTypes from 'prop-types'

/**
 * Gets eventList JSON as a prop from the blue alliance
 */
class MatchlistFilter extends Component {
  render () {
    const {
      events,
      getMatches,
      currentEventKey,
      filterMatchesByTeam
    } = this.props

    return (
      <div className='filter'>
        <EventDropdown
          events={events}
          action={getMatches}
          currentEventKey={currentEventKey}
        />
        <input
          type='number'
          placeholder='Team Number'
          maxLength='4'
          onChange={e => filterMatchesByTeam(e.target.value)}
        />
      </div>
    )
  }
}

MatchlistFilter.propTypes = {
  events: PropTypes.array.isRequired,
  getMatches: PropTypes.func.isRequired,
  currentEventKey: PropTypes.string.isRequired,
  filterMatchesByTeam: PropTypes.func.isRequired
}

export default MatchlistFilter
