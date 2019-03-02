import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { GameObjectGraph } from 'components'

class TeamData extends Component {
  render () {
    const {
      team,
      matches,
      isFetchingRecords
    } = this.props

    /** If a team is selected show its number at the page title */
    document.title = `Team${team !== 0 ? team : ' data'}`

    return (
      !isFetchingRecords && matches.length !== 0
        ? <GameObjectGraph
          height={500}
          width={500}
          matches={matches}
          gameObject={'cargo'}
        />
        : <div />
    )
  }
}

TeamData.propTypes = {
  team: PropTypes.number.isRequired,
  matches: PropTypes.array.isRequired,
  isFetchingRecords: PropTypes.bool.isRequired
}

export default TeamData
