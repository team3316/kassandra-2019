import { connect } from 'react-redux'
import Filter from '../components/Filter.jsx'
import React, { Component } from 'react'
import { getEvents } from '../actions/actions.js'

class App extends Component {
  componentDidMount () {
    const { getEvents, districtKey } = this.props
    getEvents(districtKey)
  }

  render () {
    const { isFetching, events } = this.props
    console.log(events)
    console.log(isFetching)

    return (
      <div>
        {
          isFetching || events ? <h2>Now Loading...</h2> : <Filter eventList={events} />
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  console.log(state.events)

  return {
    isFetchingEvents: state.events.isFetching,
    events: state.events.events
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getEvents: districtKey => {
      dispatch(getEvents(districtKey))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
