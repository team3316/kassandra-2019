import React from 'react'
import PropTypes from 'prop-types'
import { Record, GameObjectGraph } from 'components'
import { ComboBox, Accordion, Button } from 'carbon-components-react'

class TeamData extends React.Component {
  render () {
    const {
      matches,
      teams,
      isFetchingRecords,
      filterByTeam
    } = this.props

    // Sorts matches by descending id, to show newest matches firt
    const sortedMatches = matches.sort((a, b) => b - a)

    return (
      <div>
        {
          !isFetchingRecords
            ? <div className='strategy'>
              <ComboBox
                onChange={({ selectedItem }) => filterByTeam(selectedItem)}
                placeholder='Select team'
                label='Team'
                light
                items={teams}
                itemToString={team => team}
              />
              <br />
              <br />
              <Button onClick={() => this.props.getAll()}> Refresh </Button>
              <div>
                <GameObjectGraph data={matches.map(match => ({
                  ...match,
                  lowCargo: match.teleop.cargo.cargoShip + match.teleop.cargo.level1,
                  highCargo: match.teleop.cargo.level2 + match.teleop.cargo.level3,
                  lowPanels: match.teleop.panels.cargoShip + match.teleop.panels.level1,
                  highPanels: match.teleop.panels.level2 + match.teleop.panels.level3,
                  defenceState: match.defence.state
                }))} />
                <div className='summary'>
                  {
                    matches.length !== 0
                      ? <p> Matches played: {matches.length} </p>
                      : <div />
                  }
                  {
                    // Defence
                    matches.filter(match => match.defence.state === 'defended').length !== 0
                      ? <p> Defence amount: {matches.filter(match => match.defence.state === 'defended').length / matches.length * 100}%
                      ({matches.filter(match => match.defence.state === 'defended').length} / {matches.length}) </p>
                      : <div />
                  }
                  {
                    // Climbs to level 3
                    matches.filter(match => match.climb === 'level3').length !== 0
                      ? <p> Level 3 climb amount: {matches.filter(match => match.climb === 'level3').length} / {matches.length} </p>
                      : <div />
                  }
                  {
                    // Climbs to level 3
                    matches.filter(match => match.climb === 'level2').length !== 0
                      ? <p> Level 2 climb amount: {matches.filter(match => match.climb === 'level2').length} / {matches.length} </p>
                      : <div />
                  }
                </div>
                <Accordion>
                  {sortedMatches.map(match => <Record match={match} />)}
                </Accordion>
              </div>
            </div>
            : <div />
        }
      </div>
    )
  }
}

TeamData.propTypes = {
  matches: PropTypes.array.isRequired,
  teams: PropTypes.array.isRequired,
  isFetchingRecords: PropTypes.bool.isRequired,
  filterByTeam: PropTypes.func.isRequired,
  getAll: PropTypes.func.isRequired
}

export default TeamData
