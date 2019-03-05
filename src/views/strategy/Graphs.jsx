import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { GameObjectGraph, Footer } from 'components'
import { ComboBox, Button } from 'carbon-components-react'
import {
  GiPlainCircle as Cargo,
  GiCompactDisc as Panel
} from 'react-icons/gi'

const GraphsLegend = () => (
  <div className='legend'>
    <span>Cargo Ship</span>
    <span>Level 1</span>
    <span>Level 2</span>
    <span>Level 3</span>
  </div>
)

const ObjectGraphsRow = ({ matches }) => (
  <div className='row'>
    <div>
      <span className='title'>
        <Cargo /> Cargo
      </span>
      <GameObjectGraph
        matches={matches}
        gameObject={'cargo'}
        height={200}
        width={400}
      />
    </div>
    <div>
      <span className='title'>
        <Panel /> Panels
      </span>
      <GameObjectGraph
        matches={matches}
        gameObject={'panels'}
        height={200}
        width={400}
      />
    </div>
  </div>
)

class TeamData extends Component {
  render () {
    const {
      teams,
      filterByTeam,
      team,
      matches,
      isFetchingRecords
    } = this.props

    /** If a team is selected show its number at the page title */
    document.title = `Team ${team != null ? team : 'data'}`

    const PageContent = ({ matches }) => (
      <div className='content'>
        <ObjectGraphsRow matches={matches} />
        <GraphsLegend />
      </div>
    )

    /**
     * Filtered matches by team number, event number, and if they should be visible
     * @type {Array}
     */
    return (
      <div className='strategy' id='graphs'>
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
            ? <PageContent matches={matches} />
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

TeamData.propTypes = {
  event: PropTypes.string.isRequired,
  teams: PropTypes.array.isRequired,
  team: PropTypes.string,
  matches: PropTypes.array.isRequired,
  isFetchingRecords: PropTypes.bool.isRequired,
  filterByTeam: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
}

export default TeamData
