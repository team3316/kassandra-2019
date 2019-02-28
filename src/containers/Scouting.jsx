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
  comment,
  postForm,
  nextMatch
} from '../actions/scouting.js'
import {
  HomePage,
  Sandstorm,
  Teleop,
  Endgame
} from 'views'

class Scouting extends Component {
  constructor (props) {
    super(props)

    this.submit = this.submit.bind(this)
    this.nextMatch = this.nextMatch.bind(this)
  }

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

  /**
   * Make a submit requesg
   * @return {Promise} Resolve after submit
   */
  submit () {
    const {
      match,
      team,
      sandstormState,
      teleopState,
      endgameState,
      postForm
    } = this.props

    return postForm(match, team, sandstormState, teleopState, endgameState)
  }

  nextMatch () {
    const {
      matches,
      nextMatch
    } = this.props

    return nextMatch(matches)
  }

  render () {
    document.title = 'Select team'

    const {
      isFetchingEvents,
      isFetchingMatches,
      events,
      matches,
      event,
      match,
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
      techFouls,
      isSubmitting
    } = this.props

    const {
      submit,
      nextMatch
    } = this

    return (
      <Switch>
        <Route exact path='/' render={props =>
          <HomePage
            {...props}
            isFetchingEvents={isFetchingEvents}
            isFetchingMatches={isFetchingMatches}
            events={events}
            matches={matches}
            event={event}
            match={match}
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
            match={match}
            state={sandstormState}
            actions={sandstormActions}
          />} />
        <Route path='/teleop' render={props =>
          <Teleop
            {...props}
            team={team}
            match={match}
            state={teleopState}
            actions={changeValue}
            setIncrement={setIncrement}
            toggleDecrement={toggleDecrement}
          />} />
        <Route path='/endgame' render={props =>
          <Endgame
            {...props}
            team={team}
            match={match}
            state={endgameState}
            climb={climb}
            techFouls={techFouls}
            comment={comment}
            submit={submit}
            nextMatch={nextMatch}
            isSubmitting={isSubmitting}
          />} />
      </Switch>
    )
  }
}

Scouting.propTypes = {
  districtKey: PropTypes.string.isRequired,
  isFetchingMatches: PropTypes.bool.isRequired,
  isFetchingEvents: PropTypes.bool.isRequired,
  events: PropTypes.array.isRequired,
  matches: PropTypes.array.isRequired,
  event: PropTypes.object.isRequired,
  match: PropTypes.object,
  team: PropTypes.object,
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
  climb: PropTypes.func.isRequired,
  comment: PropTypes.func.isRequired,
  techFouls: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  postForm: PropTypes.func.isRequired,
  nextMatch: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  return {
    districtKey: state.matchlist.districtKey,
    events: state.matchlist.events,
    matches: state.matchlist.matches,
    currentEventKey: state.matchlist.currentEventKey,
    isFetchingEvents: state.matchlist.isFetchingEvents,
    isFetchingMatches: state.matchlist.isFetchingMatches,
    event: state.matchlist.event,
    match: state.scouting.match,
    team: state.scouting.team,
    sandstormState: state.scouting.sandstorm,
    teleopState: state.scouting.teleop,
    endgameState: state.scouting.endgame,
    isSubmitting: state.scouting.isSubmitting
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
    techFouls: () => dispatch(techFouls),
    postForm: (match, team, sandstorm, teleop, endgame) =>
      dispatch(postForm(match, team, sandstorm, teleop, endgame)),
    nextMatch: matches => dispatch(nextMatch(matches))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Scouting)
