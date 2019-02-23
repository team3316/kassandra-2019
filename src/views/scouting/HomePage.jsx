import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  EventDropdown,
  MatchDropdown,
  TeamSelect,
  Footer
} from 'components'
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
      match,
      isMatchSelected,
      team,
      history
    } = this.props

    return (
      <div>
        {
          /**
           * If fetching for events, show a skeleton
           */
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
          /**
           * If fetching for events, show a skeleton
           */
          isFetchingMatches || matches.length === 0
            ? <DropdownSkeleton />
            : <div>
              <MatchDropdown
                matches={matches}
                selectMatch={selectMatch}
                disabled={isFetchingMatches || matches.length === 0}
                match={match}
              />
              {
                /**
                 * If a match was selected, enable selecting a team
                 */
                isMatchSelected
                  ? <TeamSelect
                    team={team}
                    selectTeam={selectTeam}
                    match={match}
                  />
                  : <div id='Empty' />
              }
            </div>
        }
        <Footer> <Button onClick={() => history.push('/sandstorm')}> Sandstorm </Button> </Footer>
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
  match: PropTypes.object.isRequired,
  team: PropTypes.object.isRequired,
  currentEventKey: PropTypes.string.isRequired,
  getMatches: PropTypes.func.isRequired,
  selectMatch: PropTypes.func.isRequired,
  selectTeam: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
}

export default SelectTeam
