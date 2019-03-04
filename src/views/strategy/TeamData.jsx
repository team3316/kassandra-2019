import React from 'react'
import PropTypes from 'prop-types'
import { Record } from 'components'
import { ComboBox } from 'carbon-components-react'

class TeamData extends React.Component {
  render () {
    const {
      matches,
      teams,
      isFetchingRecords,
      filterByTeam
    } = this.props

    const mapMatchToView = match => <div>
      <Record match={match} />
      <br />
    </div>

    /**
     * Takes the records and maps them to components
     * @type {Array}
     */
    const recordViews = matches.map(mapMatchToView)

    return (
      <div>
        {
          !isFetchingRecords
            ? <div>
              <ComboBox
                onChange={({ selectedItem }) => filterByTeam(selectedItem)}
                placeholder='Select team'
                label='Team'
                light
                items={teams}
                itemToString={team => team}
              />
              { recordViews }
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
  filterByTeam: PropTypes.func.isRequired
}

export default TeamData
