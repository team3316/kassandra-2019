import { connect } from 'react-redux'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Switch, Route } from 'react-router-dom'
import { getEvents, getMatches } from '../actions/matchlist.js'
import { selectMatch, selectTeam, toggleHab } from '../actions/scouting.js'
import Header from '../components/Header.jsx'
import HomePage from '../views/HomePage.jsx'
import Autonomous from '../views/Autonomous.jsx'

class Scouting extends Component {
  componentDidMount () {
    const {
      getEvents,
      isFetchingEvents,
      districtKey,
      events
    } = this.props

    /*
     * Checks if matches were already fetched
     * If they weren't, fetches them from The Blue Alliance
     */
    if (isFetchingEvents === false && events.length === 0) {
      getEvents(districtKey)
    }
  }

  render () {
    document.title = 'Kassandra - Select team'

    const {
      isFetchingEvents,
      isFetchingMatches,
      events,
      isMatchSelected,
      matches,
      event,
      selectedMatch,
      team,
      currentEventKey,
      getEvents,
      getMatches,
      selectMatch,
      toggleHab
    } = this.props

    return (
      <Switch>
        <Route exact path={`${this.props.match.url}/`} render={props =>
          <HomePage
            {...props}
            isFetchingEvents={isFetchingEvents}
            isFetchingMatches={isFetchingMatches}
            events={events}
            isMatchSelected={isMatchSelected}
            matches={matches}
            event={event}
            selectedMatch={selectedMatch}
            team={team}
            currentEventKey={currentEventKey}
            getEvents={getEvents}
            getMatches={getMatches}
            selectMatch={selectMatch}
            selectTeam={this.props.selectTeam}
          />} />
        <Route path='/auto' render={props =>
          <Autonomous
            {...props}
            team={team}
            selectedMatch={selectedMatch}
            toggleHab={toggleHab}
          />} />
      </Switch>
    )
  }
}

Scouting.propTypes = {
  match: PropTypes.object.isRequired,
  districtKey: PropTypes.string.isRequired,
  isFetchingMatches: PropTypes.bool.isRequired,
  isFetchingEvents: PropTypes.bool.isRequired,
  isMatchSelected: PropTypes.bool.isRequired,
  events: PropTypes.array.isRequired,
  matches: PropTypes.array.isRequired,
  event: PropTypes.object.isRequired,
  selectedMatch: PropTypes.object.isRequired,
  team: PropTypes.object.isRequired,
  currentEventKey: PropTypes.string.isRequired,
  getEvents: PropTypes.func.isRequired,
  getMatches: PropTypes.func.isRequired,
  selectMatch: PropTypes.func.isRequired,
  selectTeam: PropTypes.func.isRequired,
  toggleHab: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  return {
    districtKey: state.matchlist.districtKey,
    events: state.matchlist.events,
    matches: state.matchlist.matches,
    currentEventKey: state.matchlist.currentEventKey,
    isFetchingEvents: state.matchlist.isFetchingEvents,
    isFetchingMatches: state.matchlist.isFetchingMatches,
    isMatchSelected: state.scouting.isMatchSelected,
    event: state.matchlist.event,
    selectedMatch: state.scouting.match,
    team: state.scouting.team
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getEvents: districtKey => dispatch(getEvents(districtKey)),
    getMatches: event => dispatch(getMatches(event)),
    selectMatch: match => dispatch(selectMatch(match)),
    selectTeam: team => dispatch(selectTeam(team)),
    toggleHab: () => dispatch(toggleHab)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Scouting)
