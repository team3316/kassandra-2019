import React from 'react'
import PropTypes from 'prop-types'
import { Record } from 'components'
import { ComboBox, Accordion } from 'carbon-components-react'

class TeamData extends React.Component {
  render () {
    const {
      matches,
      teams,
      isFetchingRecords,
      filterByTeam
    } = this.props

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
              <div className='content'>
                <Accordion>
                  {matches.map(match => <Record match={match} />)}
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
  history: PropTypes.object.isRequired
}

export default TeamData
