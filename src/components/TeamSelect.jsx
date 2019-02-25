import React, { Component } from 'react'
import { DropdownV2 as Dropdown } from 'carbon-components-react'
import PropTypes from 'prop-types'

class TeamSelect extends Component {
  render () {
    const {
      team,
      selectTeam,
      match
    } = this.props

    /**
     * Creates an array of each color of teams
     * Each element in the array contains:
     *
     * number: the team number,
     * color: the team color in the match,
     * pos: the team position in the alliance,
     * label: a label to show in the dropdown
     */
    const redTeams = match.alliances.red.team_keys.map((teamNumber, index) => {
      return {
        number: teamNumber,
        color: 'red',
        index,
        label: `${teamNumber} - Red ${index + 1}`
      }
    })
    const blueTeams = match.alliances.blue.team_keys.map((teamNumber, index) => {
      return {
        number: teamNumber,
        color: 'blue',
        index,
        label: `${teamNumber} - Blue ${index + 1}`
      }
    })

    const teams = redTeams.concat(blueTeams)

    return (
      <Dropdown
        onChange={e => selectTeam(e.selectedItem)}
        label={'Select team'}
        selectedItem={team}
        light
        items={teams}
        itemToElement={team => (<span className={`${team.color}Team`}> {team.label} </span>)}
      />
    )
  }
}

TeamSelect.propTypes = {
  selectTeam: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  team: PropTypes.object
}

export default TeamSelect
