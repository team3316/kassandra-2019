import { connect } from 'react-redux'
import Filter from '../components/MatchlistFilter.jsx'
import Matchlist from '../components/Matchlist.jsx'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { getEvents, getMatches, filterMatchesByTeam } from '../actions/actions.js'
import { Loading } from 'carbon-components-react'

class App extends Component {
  componentDidMount () {
    document.title = 'Kassandra - Match List'

    const { getEvents, districtKey } = this.props
    getEvents(districtKey)
  }

  render () {
    const {
      isFetchingEvents,
      isFetchingMatches,
      events,
      matches,
      team,
      getMatches,
      filterMatchesByTeam,
      currentEventKey
    } = this.props

    return (
      <div>
        {
          isFetchingEvents || events.length === 0
            ? <Loading
              color={'#ff9933'}
              type={'spin'}
            />
            : <div>
              <Filter
                events={events}
                getMatches={eventKey => getMatches(eventKey)}
                filterMatchesByTeam={team => filterMatchesByTeam(team)}
                currentEventKey={currentEventKey}
              />

              {
                isFetchingMatches || matches.length === 0
                  ? <Loading
                    color={'#ff9933'}
                    type={'spin'}
                  />
                  : <Matchlist
                    matches={matches}
                    selectedTeam={team}
                  />
              }

            </div>
        }
      </div>
    )
  }
}

App.propTypes = {
  getEvents: PropTypes.func.isRequired,
  getMatches: PropTypes.func.isRequired,
  filterMatchesByTeam: PropTypes.func.isRequired,
  isFetchingMatches: PropTypes.bool.isRequired,
  isFetchingEvents: PropTypes.bool.isRequired,
  districtKey: PropTypes.string.isRequired,
  events: PropTypes.array.isRequired,
  matches: PropTypes.array.isRequired,
  team: PropTypes.string.isRequired,
  currentEventKey: PropTypes.string.isRequired
}

const mapStateToProps = ({ matchlist }) => {
  return {
    isFetchingEvents: matchlist.isFetchingEvents,
    isFetchingMatches: matchlist.isFetchingMatches,
    matches: matchlist.matches,
    events: matchlist.events,
    districtKey: matchlist.districtKey,
    team: matchlist.team,
    currentEventKey: matchlist.currentEventKey
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getEvents: districtKey => dispatch(getEvents(districtKey)),
    getMatches: eventKey => dispatch(getMatches(eventKey)),
    filterMatchesByTeam: team => dispatch(filterMatchesByTeam(team))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
