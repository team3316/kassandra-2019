import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Filter from '../components/MatchlistFilter.jsx'
import Matchlist from '../components/Matchlist.jsx'
import React, { Component } from 'react'
import { getEvents, getMatches, selectTeam } from '../actions/actions.js'
import Loading from 'react-loading'

class App extends Component {
  componentDidMount () {
    document.title = 'Match List'

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
      selectTeam
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
                selectTeam={team => selectTeam(team)}
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

const mapStateToProps = ({ admin }) => {
  return {
    isFetchingEvents: admin.isFetchingEvents,
    isFetchingMatches: admin.isFetchingMatches,
    matches: admin.matches,
    events: admin.events,
    districtKey: admin.districtKey,
    team: admin.team
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getEvents: districtKey => dispatch(getEvents(districtKey)),
    getMatches: eventKey => dispatch(getMatches(eventKey)),
    selectTeam: team => dispatch(selectTeam(team))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
