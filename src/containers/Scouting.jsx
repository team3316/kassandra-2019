import { connect } from 'react-redux'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Switch, Route } from 'react-router-dom'
import { getEvents, getMatches, selectMatch, selectTeam } from '../actions/actions.js'
import HomePage from '../views/HomePage.jsx'
import Autonomous from '../views/Autonomous.jsx'

class Scouting extends Component {
  componentDidMount () {
    document.title = 'Kassandra - Select team'

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
      selectMatch
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
        <Route path='/' render={props => <Autonomous
          {...props}
          team={team}
          selectedMatch={selectedMatch}
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
  selectTeam: PropTypes.func.isRequired
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
    selectTeam: team => dispatch(selectTeam(team))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Scouting)
