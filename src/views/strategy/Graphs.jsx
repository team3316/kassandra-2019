import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { GameObjectGraph, Footer } from 'components'
import { ComboBox, Button } from 'carbon-components-react'

class Graphs extends Component {
  render () {
    const {
      teams,
      filterByTeam,
      team,
      graphData,
      requestGraphs,
      isFetchingRecords,
      event
    } = this.props

    /** If a team is selected show its number at the page title */
    document.title = `Team ${team != null ? team : 'data'}`

    /**
     * Filtered matches by team number, event number, and if they should be visible
     * @type {Array}
     */
    return (
      <div className='strategy' id='graphs'>
      // On change, dispatches team to the state
        <ComboBox
          onChange={({ selectedItem }) => filterByTeam(selectedItem)}
          placeholder='Select team'
          label='Team'
          light
          items={teams}
          itemToString={team => team}
        />
        <Button onClick={() => requestGraphs(team, event)}> Fetch graphs </Button>

        {
          !isFetchingRecords && graphData.length !== 0 && team != null
            ? <GameObjectGraph data={graphData} />
            : <div />
        }

        <Footer>
          <Button onClick={() => this.props.history.push(`/strategy/team`)}>
            Team reports
          </Button>
        </Footer>
      </div>
    )
  }
}

Graphs.propTypes = {
  teams: PropTypes.array.isRequired,
  event: PropTypes.string.isRequired,
  team: PropTypes.string,
  graphData: PropTypes.array.isRequired,
  requestGraphs: PropTypes.func.isRequired,
  isFetchingRecords: PropTypes.bool.isRequired,
  filterByTeam: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
}

export default Graphs
