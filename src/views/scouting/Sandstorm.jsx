import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Checkbox, Button } from 'carbon-components-react'
import { Link } from 'react-router-dom'
import {
  GiSightDisabled as SightDisabled,
  GiSailboat as Sailboat,
  GiCompactDisc as Panel
} from 'react-icons/gi'
import { FiCircle as Cargo } from 'react-icons/fi'
import { IoIosRocket as Rocket } from 'react-icons/io'
import {
  Header,
  Footer
} from 'components'

class Sandstorm extends Component {
  render () {
    document.title = 'Sandstorm'

    const {
      team,
      match,
      history,
      state,
      actions
    } = this.props

    return (
      <div id='auto'>
        <Header color={team.color}>
          <span> {`${match.name} | ${team.label}`} </span>
        </Header>

        <div className='content noselect'>
          <div className={`pageTitle ${team.color}Team`}>
            <SightDisabled /> <h1>Sandstorm</h1>
          </div>

          <div className='form'>
            <Checkbox
              id={`habLine ${team.color}`}
              className='test'
              labelText='Hab line'
              onChange={() => actions('toggleHab')}
              checked={state.habLine}
            />
            <span className='titles'>
              <span className='title'> <Cargo /> Cargo </span>
              <span className='title'> <Panel /> Hatch Panels </span>
            </span>

            <div className='buttons'>
              <div className='column'>
                <Button
                  className={state.cargoToCargoShip ? team.color : ' disabled'}
                  onClick={() => actions('toggleCargoToCargoShip')}
                >
                  <Sailboat /> Cargo Ship
                </Button>
                <Button
                  className={state.cargoToRocket ? team.color : ' disabled'}
                  onClick={() => actions('toggleCargoToRocket')}
                >
                  <Rocket /> Rocket
                </Button>
              </div>

              <div className='column'>
                <Button
                  className={state.panelToCargoShip ? team.color : ' disabled'}
                  onClick={() => actions('togglePanelToCargoShip')}
                >
                  <Sailboat /> Cargo Ship
                </Button>
                <Button
                  className={state.panelToRocket ? team.color : ' disabled'}
                  onClick={() => actions('togglePanelToRocket')}
                >
                  <Rocket /> <span> Rocket </span>
                </Button>
              </div>
            </div>
          </div>
        </div>

        <Footer>
          <Button onClick={() => history.push('/')}> Team Selection </Button>
          <Button onClick={() => history.push('/teleop')}> Teleop </Button>
        </Footer>
      </div>
    )
  }
}

Sandstorm.propTypes = {
  team: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  state: PropTypes.object.isRequired,
  actions: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
}

export default Sandstorm
