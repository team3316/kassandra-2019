import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Header from './Header.jsx'

/**
 * A header for scouting views that shows the selected match and team
 */
class ScoutingHeader extends Component {
  render () {
    const {
      match,
      team
    } = this.props

    /**
     * If the match isn't a practice match, show a coloured header
     * If not, only show match and team number
     */
    if (match.comp_level !== 'PM') {
      return (
        <Header color={team.color}>
          <span> {`${match.name} | ${team.label}`} </span>
        </Header>
      )
    } else {
      return (
        <Header> <span> {`${match.name} | ${team.number}`} </span> </Header>
      )
    }
  }
}

ScoutingHeader.propTypes = {
  team: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
}

export default ScoutingHeader
