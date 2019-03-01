import { connect } from 'react-redux'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { TeamData } from 'views'
import { getAll, filterByTeam } from 'actions/strategy.js'

class Strategy extends Component {
  componentDidMount () {
    const { getAll } = this.props
    getAll()
  }

  render () {
    const {
      state,
      filterByTeam
    } = this.props

    return (
      <TeamData
        {...state}
        filterByTeam={filterByTeam}
      />
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
