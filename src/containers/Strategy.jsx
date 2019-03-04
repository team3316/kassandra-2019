import { connect } from 'react-redux'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Graphs, TeamData } from 'views'
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

    const filteredMatches = matches.filter(match =>
      match.teamNumber === team && match.visible && (event === 'All' ? true : match.event === event))

    return (
      <Switch>
        <Route path={`${this.props.match.path}/graphs`} render={props =>
          <Graphs
            {...props}
            {...this.props.state}
            matches={filteredMatches}
            filterByTeam={this.props.filterByTeam}
          />}
        />
        <Route path={`${this.props.match.path}/team`} render={props =>
          <TeamData
            {...props}
            {...this.props.state}
            matches={matches}
            filterByTeam={this.props.filterByTeam}
            getAll={getAll}
          />}
        />
      </Switch>
    )
  }
}

Strategy.propTypes = {
  state: PropTypes.object.isRequired,
  getAll: PropTypes.func.isRequired,
  filterByTeam: PropTypes.func.isRequired
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
