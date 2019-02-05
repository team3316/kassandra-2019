import { connect } from 'react-redux'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { getEvents, getMatches, selectMatch } from '../actions/actions.js'
import { Loading } from 'carbon-components-react'
import EventDropdown from '../components/EventDropdown.jsx'
import MatchDropdown from '../components/MatchDropdown.jsx'

class Scouting extends Component {
  componentDidMount () {
    document.title = 'Kassandra - Select team'

    const {
      getEvents,
      isFetchingEvents,
      districtKey,
      events
    } = this.props

    /**
     * Checks if matches were already fetched
     * If they weren't, fetches them from The Blue Alliance
     */
    if (isFetchingEvents === false && events.length === 0) {
      getEvents(districtKey)
      console.log('Events fetched')
    }
  }

  render () {
    const {
      events,
      matches,
      isFetchingMatches,
      isFetchingEvents,
      getMatches,
      selectMatch,
      currentEventKey,
      match
    } = this.props

    return (
      <div>
        {
          /**
           * While the events,  teams are fetching, show a loading bar
           * When they finish fetching, load the page
           */
          isFetchingEvents || events.length === 0
            ? <Loading />
            : <div>
              <EventDropdown
                events={events}
                getMatches={getMatches}
                currentEventKey={currentEventKey}
              />
              {
                isFetchingMatches || matches.length === 0
                  ? <Loading />
                  : <div>
                    <MatchDropdown
                      matches={matches}
                      selectMatch={selectMatch}
                    />
                  </div>
              }
            </div>
        }
      </div>
    )
  }
}

Scouting.propTypes = {
  districtKey: PropTypes.string.isRequired,
  isFetchingMatches: PropTypes.bool.isRequired,
  isFetchingEvents: PropTypes.bool.isRequired,
  events: PropTypes.array.isRequired,
  matches: PropTypes.array.isRequired,
  match: PropTypes.object.isRequired,
  currentEventKey: PropTypes.string.isRequired,
  getEvents: PropTypes.func.isRequired,
  getMatches: PropTypes.func.isRequired,
  selectMatch: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  return {
    districtKey: state.matchlist.districtKey,
    events: state.matchlist.events,
    matches: state.matchlist.matches,
    currentEventKey: state.matchlist.currentEventKey,
    isFetchingEvents: state.matchlist.isFetchingEvents,
    isFetchingMatches: state.matchlist.isFetchingMatches
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getEvents: districtKey => dispatch(getEvents(districtKey)),
    getMatches: eventKey => dispatch(getMatches(eventKey)),
    selectMatch: match => dispatch(selectMatch(match))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Scouting)
