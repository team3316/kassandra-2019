import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ScoutingHeader, Footer, Defence } from 'components'
import {
  DropdownV2 as Dropdown,
  Checkbox,
  Button,
  TextArea,
  InlineLoading
} from 'carbon-components-react'
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
      match,
      state,
      climb,
      comment,
      techFouls,
      isSubmitting,
      submit,
      nextMatch,
      defenceActions,
      history
    } = this.props

    return (
      <div className='endgame'>
        <ScoutingHeader match={match} team={team} />

        <div className='content noselect'>
          <div className={`pageTitle
            ${team.color == null ? '' : `${team.color}Team`}`}
          >
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
            <Defence
              actions={defenceActions}
              state={state.defence}
            />
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
          <Button onClick={() => history.push('/scouting/teleop')}> Teleop </Button>
          {
            !isSubmitting
              ? <Button onClick={() => {
                submit().then(res => {
                  nextMatch()
                  history.push('/scouting')
                })
              }}> Submit </Button>
              : <InlineLoading
                success={!isSubmitting}
                description='Submitting...'
              />
          }
        </Footer>
      </div>
    )
  }
}

Endgame.propTypes = {
  team: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  state: PropTypes.object.isRequired,
  climb: PropTypes.func.isRequired,
  comment: PropTypes.func.isRequired,
  techFouls: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  submit: PropTypes.func.isRequired,
  nextMatch: PropTypes.func.isRequired,
  defenceActions: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
}

export default Endgame
