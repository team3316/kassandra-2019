import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Header, Footer } from 'components'
import {
  DropdownV2 as Dropdown,
  Checkbox,
  Button,
  TextArea
} from 'carbon-components-react'
import { Link } from 'react-router-dom'
import { GiStairsGoal as Stairs } from 'react-icons/gi'
class Endgame extends Component {
  render () {
    document.title = 'Endgame'

    const climbLevels = [{
      label: 'Nothing',
      value: 'nothing'
    }, {
      label: 'Failed',
      value: 'failed'
    }, {
      label: 'Level 1',
      value: 'level1'
    }, {
      label: 'Level 2',
      value: 'level2'
    }, {
      label: 'Level 3',
      value: 'level3'
    }]

    const {
      team,
      selectedMatch,
      state,
      climb,
      comment,
      techFouls
    } = this.props

    return (
      <div className='endgame'>
        <Header color={team.color}>
          <span> {`${selectedMatch.name} | ${team.label}`} </span>
        </Header>

        <div className='content noselect'>
          <div className={`pageTitle ${team.color}Team`}>
            <Stairs /> <h1> Endgame </h1>
          </div>
          <div className='form'>
            <Checkbox
              id={`techFouls ${team.color}`}
              labelText='Tech fouls'
              onChange={() => techFouls()}
              checked={state.techFouls}
            />

            <Dropdown
              onChange={({ selectedItem }) => climb(selectedItem)}
              titleText='Climb'
              label='Select climb level'
              light
              selectedItem={state.climb}
              items={climbLevels}
              itemToString={item => item.label}
            />
            <br />
            <TextArea
              light
              labelText='Comments'
              placeholder={'Write your comments here \n' +
              'Slow intake, bad driver, fouls etc.'}
              onChange={({ target }) => comment(target.value)}
              value={state.comment}
            />
          </div>
        </div>
        <Footer>
          <Link to='/teleop'> <Button> Teleop </Button> </Link>
          <Button> Submit </Button>
        </Footer>
      </div>
    )
  }
}

Endgame.propTypes = {
  team: PropTypes.object.isRequired,
  selectedMatch: PropTypes.object.isRequired,
  state: PropTypes.object.isRequired,
  climb: PropTypes.func.isRequired,
  comment: PropTypes.func.isRequired,
  techFouls: PropTypes.func.isRequired
}

export default Endgame
