import { connect } from 'react-redux'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Graphs, TeamData, Rankings } from 'views'
import { getAll, filterByTeam, requestByTeam } from 'actions/strategy.js'
import { Switch, Route } from 'react-router-dom'

class Strategy extends Component {
  componentDidMount () {
    document.title = 'Strategy'
    const { getAll } = this.props
    getAll()
  }

  render () {
    const { matches, event, team } = this.props.state

    const filteredMatches = matches.sort((a, b) => a.id - b.id).filter(match =>
      match.teamNumber === team && (event === 'All' ? true : match.event === event))

    return (
      <Switch>
        <Route path={`${this.props.match.path}/graphs`} render={props =>
          <Graphs
            {...props}
            {...this.props.state}
            matches={filteredMatches.filter(m => m.visible)}
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
          />}
        />
      </Switch>
    )
  }
}

Strategy.propTypes = {
  state: PropTypes.object.isRequired,
  getAll: PropTypes.func.isRequired,
  filterByTeam: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired
}

const mapStateToProps = ({ strategy }) => ({ state: strategy })

const mapDispatchToProps = dispatch => ({
  getAll: () => dispatch(getAll()),
  filterByTeam: team => dispatch(filterByTeam(team)),
  requestByTeam: team => dispatch(requestByTeam(team))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Strategy)
