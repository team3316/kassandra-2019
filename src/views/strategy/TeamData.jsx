import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { GameObjectGraph } from 'components'
import { ComboBox } from 'carbon-components-react'

class TeamData extends Component {
  render () {
    const {
      event,
      teams,
      filterByTeam,
      team,
      matches,
      isFetchingRecords
    } = this.props

    /** If a team is selected show its number at the page title */
    document.title = `Team ${team != null ? team : 'data'}`

    /**
     * Filtered matches by team number, event number, and if they should be visible
     * @type {Array}
     */
    const filteredMatches = matches.filter(match =>
      match.teamNumber === team && match.visible && (event === 'All' ? true : match.event === event))

    return (
      <div>
        <ComboBox
          onChange={({ selectedItem }) => filterByTeam(selectedItem)}
          placeholder='Select team'
          label='Team'
          light
          items={teams}
          itemToString={team => team}
        />
        {
          !isFetchingRecords && matches.length !== 0 && team != null
            ? <div>
              <GameObjectGraph
                matches={matches.filter(match => match.teamNumber === team && match.visible)}
                gameObject={'cargo'}
                height={200}
                width={400}
              />
              <GameObjectGraph
                matches={matches.filter(match => match.teamNumber === team)}
                gameObject={'panels'}
                height={200}
                width={400}
              />
            </div>
            : <div />
        }
      </div>
    )
  }
}

TeamData.propTypes = {
  teams: PropTypes.array.isRequired,
  team: PropTypes.string,
  matches: PropTypes.array.isRequired,
  isFetchingRecords: PropTypes.bool.isRequired,
  filterByTeam: PropTypes.func.isRequired
}

export default TeamData
