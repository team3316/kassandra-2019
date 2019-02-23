import { connect } from 'react-redux'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Switch, Route } from 'react-router-dom'
import { getEvents, getMatches } from '../actions/matchlist.js'
import {
  selectMatch,
  selectTeam,
  sandstorm,
  changeValue,
  toggleDecrement,
  setIncrement,
  climb,
  techFouls,
  comment
} from '../actions/scouting.js'
import {
  HomePage,
  Sandstorm,
  Teleop,
  Endgame
} from 'views'

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
    document.title = 'Select team'

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
      selectTeam,
      sandstormState,
      sandstormActions,
      teleopState,
      changeValue,
      toggleDecrement,
      setIncrement,
      endgameState,
      climb,
      comment,
      techFouls
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
            selectTeam={selectTeam}
          />} />
        <Route path='/sandstorm' render={props =>
          <Sandstorm
            {...props}
            team={team}
            selectedMatch={selectedMatch}
            state={sandstormState}
            actions={sandstormActions}
          />} />
        <Route path='/teleop' render={props =>
          <Teleop
            {...props}
            team={team}
            selectedMatch={selectedMatch}
            state={teleopState}
            actions={changeValue}
            setIncrement={setIncrement}
            toggleDecrement={toggleDecrement}
          />} />
        <Route path='/endgame' render={props =>
          <Endgame
            {...props}
            team={team}
            selectedMatch={selectedMatch}
            state={endgameState}
            climb={climb}
            techFouls={techFouls}
            comment={comment}
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
  sandstormState: PropTypes.object.isRequired,
  sandstormActions: PropTypes.func.isRequired,
  teleopState: PropTypes.object.isRequired,
  changeValue: PropTypes.func.isRequired,
  toggleDecrement: PropTypes.func.isRequired,
  setIncrement: PropTypes.func.isRequired,
  endgameState: PropTypes.object.isRequired,
  climb: PropTypes.func.isRequired
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
    team: state.scouting.team,
    sandstormState: state.scouting.sandstorm,
    teleopState: state.scouting.teleop,
    endgameState: state.scouting.endgame
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getEvents: districtKey => dispatch(getEvents(districtKey)),
    getMatches: event => dispatch(getMatches(event)),
    selectMatch: match => dispatch(selectMatch(match)),
    selectTeam: team => dispatch(selectTeam(team)),
    sandstormActions: type => dispatch(sandstorm[type]),
    changeValue: (type, shouldDecrement) => dispatch(changeValue(type, shouldDecrement)),
    toggleDecrement: () => dispatch(toggleDecrement),
    setIncrement: () => dispatch(setIncrement),
    climb: level => dispatch(climb(level)),
    comment: text => dispatch(comment(text)),
    techFouls: () => dispatch(techFouls)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Scouting)
