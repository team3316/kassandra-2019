import { connect } from 'react-redux'
import Events from '../components/EventDropdown.jsx'
import Matchlist from '../components/Matchlist.jsx'
import React, { Component } from 'react'
import { getEvents, getMatches } from '../actions/actions.js'
import Loading from 'react-loading'

class App extends Component {
  componentDidMount () {
    document.title = 'Match List'

    const { getEvents, districtKey } = this.props
    getEvents(districtKey)
  }

  render () {
    const { isFetchingEvents, isFetchingMatches, events, matches, getMatches } = this.props

    return (
      <div>
        {
          isFetchingEvents || events.length === 0
            ? <Loading
              color={'#ff9933'}
              type={'spin'}
            />
            : <div>
              <Events
                events={events}
                getMatches={eventKey => getMatches(eventKey)}
              />

              {
                isFetchingMatches || matches.length === 0
                  ? <Loading
                    color={'#ff9933'}
                    type={'spin'}
                  />
                  : <Matchlist matches={matches} />
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
    districtKey: admin.districtKey
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getEvents: districtKey => dispatch(getEvents(districtKey)),
    getMatches: eventKey => dispatch(getMatches(eventKey))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
