import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  EventDropdown,
  MatchDropdown,
  TeamSelect,
  Footer,
  TeamInput
} from 'components'
import { DropdownSkeleton, Button, NumberInput } from 'carbon-components-react'

class HomePage extends Component {
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
      team,
      districtKey,
      history
    } = this.props

    /**
     * Flags if you should be fetching for matches
     */
    const shouldFetchMatches = isFetchingMatches || matches.length === 0

    return (
      <div>
        {
          /**
           * If the district key is specified enable event selection
           */
          districtKey !== 'non'
          /**
           * If fetching for events, show a skeleton
           * If not, show an event dropdown
           */
            ? isFetchingEvents || events.length === 0
              ? <DropdownSkeleton />
              : <EventDropdown
                events={events}
                action={getMatches}
                currentEventKey={currentEventKey}
                event={event}
                shouldFetchMatches={shouldFetchMatches}
              />
            : <div />
        }

        {
          /**
           * If fetching for matches, show a skeleton
           */
          shouldFetchMatches
            ? <DropdownSkeleton />
            : <div>
              <div className='matchSelection'>
                <MatchDropdown
                  matches={matches}
                  selectMatch={selectMatch}
                  disabled={isFetchingMatches || matches.length === 0}
                  match={match}
                />
                {
                  /**
                   * Checks if a match has been selected,
                   * Then checks if the match is a practice match
                   * If the match is a practice match, show a number input box
                   */
                  match != null
                    ? match.comp_level === 'PM'
                      ? <NumberInput
                        id='practiceMatch'
                        light
                        label='Practice match number'
                        placeholder='Enter practice match number'
                        min={1}
                        invalidText='Please enter a number'
                        value={match.number}
                        onChange={e => {
                          const { value } = document.querySelector('#practiceMatch')

                          selectMatch({
                            ...match,
                            name: `Practice${value != null ? ` ${value}` : ''}`,
                            key: `${match.event_key}_pm${value}`,
                            number: Number(value)
                          })
                        }}
                      />
                      : <div className='empty' />
                    : <div className='empty' />
                }
              </div>
              {
                /**
                 * If a match was selected, enable selecting a team
                 */
                match != null
                /**
                 * Check if the match is a practice match
                 * If not, show dropdown
                 * If it is a practice match, show a number input box
                 */
                  ? match.comp_level !== 'PM'
                    ? <TeamSelect
                      team={team}
                      selectTeam={selectTeam}
                      match={match}
                    />
                    : <TeamInput
                      id='practiceTeam'
                      value={team != null ? team.number : 1}
                      onChange={value => selectTeam({
                        number: Number(value),
                        label: value
                      })
                      }
                    />
                  : <div id='empty' />
              }
            </div>
        }
        <Footer>
          {
          /**
           * Navigation button to Sandstorm page
           * Disabled if a team isn't selected
           */
          }
          <Button
            onClick={() => history.push('/scouting/sandstorm')}
            disabled={team === null}
          >
            Sandstorm
          </Button>
        </Footer>
      </div>
    )
  }
}

HomePage.propTypes = {
  districtKey: PropTypes.string.isRequired,
  isFetchingMatches: PropTypes.bool.isRequired,
  isFetchingEvents: PropTypes.bool.isRequired,
  events: PropTypes.array.isRequired,
  matches: PropTypes.array.isRequired,
  event: PropTypes.object.isRequired,
  match: PropTypes.object,
  team: PropTypes.object,
  currentEventKey: PropTypes.string.isRequired,
  getMatches: PropTypes.func.isRequired,
  selectMatch: PropTypes.func.isRequired,
  selectTeam: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
}

export default HomePage
