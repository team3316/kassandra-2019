import React, { Component } from 'react'
import PropTypes from 'prop-types'
import EventDropdown from '../components/EventDropdown.jsx'
import MatchDropdown from '../components/MatchDropdown.jsx'
import TeamSelect from '../components/TeamSelect.jsx'
import { Link } from 'react-router-dom'
import { DropdownSkeleton, Button } from 'carbon-components-react'

class SelectTeam extends Component {
  render () {
    const {
      events,
      event,
      matches,
      isFetchingMatches,
      isFetchingEvents,
      getMatches,
      selectMatch,
      currentEventKey,
      selectTeam,
      selectedMatch,
      isMatchSelected,
      team
    } = this.props

    return (
      <div>
        {
          isFetchingEvents || events.length === 0
            ? <DropdownSkeleton />
            : <div>
              <EventDropdown
                events={events}
                action={getMatches}
                currentEventKey={currentEventKey}
                event={event}
              />
            </div>
        }

        {
          isFetchingMatches || matches.length === 0
            ? <DropdownSkeleton />
            : <div>
              <MatchDropdown
                matches={matches}
                selectMatch={selectMatch}
                disabled={isFetchingMatches || matches.length === 0}
                match={selectedMatch}
              />
              {
                isMatchSelected
                  ? <TeamSelect
                    team={team}
                    selectTeam={selectTeam}
                    match={selectedMatch}
                  />
                  : <div id='Empty' />
              }
            </div>
        }
        <Link to='/auto' > <Button> Auto </Button> </Link>
      </div>
    )
  }
}

SelectTeam.propTypes = {
  isFetchingMatches: PropTypes.bool.isRequired,
  isFetchingEvents: PropTypes.bool.isRequired,
  isMatchSelected: PropTypes.bool.isRequired,
  events: PropTypes.array.isRequired,
  matches: PropTypes.array.isRequired,
  event: PropTypes.object.isRequired,
  selectedMatch: PropTypes.object.isRequired,
  team: PropTypes.object.isRequired,
  currentEventKey: PropTypes.string.isRequired,
  getMatches: PropTypes.func.isRequired,
  selectMatch: PropTypes.func.isRequired,
  selectTeam: PropTypes.func.isRequired
}

export default SelectTeam
