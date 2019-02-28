import { connect } from 'react-redux'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { TeamData } from 'views'

class Strategy extends Component {
  render () {
    return (
      <TeamData />
    )
  }
}

Strategy.propTypes = {

}

const mapStateToProps = ({ strategy }) => ({
  events: strategy.events,
  event: strategy.event,
  teams: strategy.teams,
  team: strategy.team,
  isFetchingRecords: strategy.isFetchingRecords,
  matches: strategy.matches
})

const mapDispatchToProps = dispatch => ({

})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Strategy)
