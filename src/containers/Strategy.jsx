import { connect } from 'react-redux'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { TeamData } from 'views'
import { getAll, filterByTeam } from 'actions/strategy.js'
import { Switch, Route } from 'react-router-dom'

class Strategy extends Component {
  componentDidMount () {
    document.title = 'Strategy'
    const { getAll } = this.props
    getAll()
  }

  render () {
    return (
      <Switch>
        <Route path={`${this.props.match.path}/team`} render={props =>
          <TeamData
            {...props}
            {...this.props.state}
            filterByTeam={this.props.filterByTeam}
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
  filterByTeam: team => dispatch(filterByTeam(team))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Strategy)
