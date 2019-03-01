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

    document.title = `Team${team !== 0 ? team : ' data'}`

    return (
      !isFetchingRecords && matches.length !== 0
        ? <GameObjectGraph
          height={500}
          width={1000}
          matches={matches}
          gameObject={'cargo'}
        />
        : <div />
    )
  }
}

TeamData.propTypes = {
  team: PropTypes.number.isRequired
}

export default TeamData
