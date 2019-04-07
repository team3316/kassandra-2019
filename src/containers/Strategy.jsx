import { connect } from 'react-redux'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Graphs, TeamData, Rankings } from 'views'
import {
  getAll,
  filterByTeam,
  requestByTeam,
  getRankings,
  getGraphData
} from 'actions/strategy.js'
import { Switch, Route } from 'react-router-dom'

class Strategy extends Component {
  componentDidMount () {
    document.title = 'Strategy'
    const { getAll } = this.props
    getAll()
  }

  render () {
    const { matches, team } = this.props.state
    const { event, getAll } = this.props

    const filteredMatches = matches.sort((a, b) => a.id - b.id).filter(match =>
      match.teamNumber === team && match.eventKey === event)

    return (
      <Switch>
        <Route path={`${this.props.match.path}/graphs`} render={props =>
          <Graphs
            {...props}
            {...this.props.state}
            matches={filteredMatches.filter(m => m.visible)}
            requestGraphs={this.props.requestGraphs}
            event={this.props.event}
            filterByTeam={this.props.filterByTeam}
          />}
        />
        <Route path={`${this.props.match.path}/team`} render={props =>
          <TeamData
            {...props}
            {...this.props.state}
            matches={filteredMatches}
            filterByTeam={this.props.filterByTeam}
            getAll={getAll}
          />}
        />
        <Route path={`${this.props.match.path}/rankings`} render={props =>
          <Rankings
            {...props}
            {...this.props.state}
            getRankings={this.props.getRankings}
            event={this.props.event}
          />}
        />
      </Switch>
    )
  }
}

Strategy.propTypes = {
  state: PropTypes.object.isRequired,
  getAll: PropTypes.func.isRequired,
  requestGraphs: PropTypes.func.isRequired,
  filterByTeam: PropTypes.func.isRequired,
  getRankings: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  event: PropTypes.string.isRequired
}

const mapStateToProps = state => ({
  event: state.matchlist.currentEventKey,
  state: state.strategy
})

const mapDispatchToProps = dispatch => ({
  getAll: () => dispatch(getAll()),
  requestGraphs: (team, event) => dispatch(getGraphData(team, event)),
  filterByTeam: team => dispatch(filterByTeam(team)),
  requestByTeam: team => dispatch(requestByTeam(team)),
  getRankings: event => dispatch(getRankings(event))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Strategy)
