import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ScoutingHeader, Footer } from 'components'
import { Button } from 'carbon-components-react'
import {
  GiJoystick as Controller,
  GiSailboat as Sailboat,
  GiCompactDisc as Panel
} from 'react-icons/gi'
import { FiCircle as Cargo } from 'react-icons/fi'

/**
 * TODO: Find a better controller icon
 * TODO: Add icons to rocket levels
 */
class Teleop extends Component {
  render () {
    document.title = 'Teleop'

    const {
      team,
      match,
      state,
      actions,
      toggleDecrement,
      setIncrement,
      history
    } = this.props

    const {
      cargo,
      panels,
      shouldDecrement
    } = state

    return (
      <div className='teleop'>
        <ScoutingHeader match={match} team={team} />

        <div className='content noselect'>
          <div className={`pageTitle
            ${team.color == null ? '' : `${team.color}Team`}`}
          >
            <Controller /> <h1>Teleop</h1>
          </div>
          <div className='form'>
            <span className='titles'>
              <span className='title'> <Cargo /> Cargo </span>
              <span className='title'> <Panel /> Hatch Panels </span>
            </span>
            <Button
              className={`toggleDecrement ${!shouldDecrement ? 'decrement' : 'increment'}`}
              onClick={() => toggleDecrement()}
            >
              {!shouldDecrement ? '-' : '+'}
            </Button>
            <div className={`buttons ${!shouldDecrement ? 'increment' : 'decrement'}`}>
              <div className='column'>
                <Button onClick={() => actions('cargoToCargoShip', shouldDecrement)}>
                  <Sailboat /> Cargo Ship - {cargo.cargoShip}
                </Button>
                <Button onClick={() => actions('cargoToLevel3', shouldDecrement)}>
                  Level III - {cargo.level3}
                </Button>
                <Button onClick={() => actions('cargoToLevel2', shouldDecrement)}>
                  Level II - {cargo.level2}
                </Button>
                <Button onClick={() => actions('cargoToLevel1', shouldDecrement)}>
                  Level I - {cargo.level1}
                </Button>
              </div>

              <div className='column'>
                <Button onClick={() => actions('panelToCargoShip', shouldDecrement)}>
                  <Sailboat /> Cargo Ship - {panels.cargoShip}
                </Button>
                <Button onClick={() => actions('panelToLevel3', shouldDecrement)}>
                  Level III - {panels.level3}
                </Button>
                <Button onClick={() => actions('panelToLevel2', shouldDecrement)}>
                  Level II - {panels.level2}
                </Button>
                <Button onClick={() => actions('panelToLevel1', shouldDecrement)}>
                  Level I - {panels.level1}
                </Button>
              </div>
            </div>
          </div>
        </div>
        <Footer>
          <Button onClick={() => {
            setIncrement()
            history.push(`/sandstorm`)
          }}> Sandstorm </Button>
          <Button onClick={() => {
            setIncrement()
            history.push('/endgame')
          }}> Endgame </Button>
        </Footer>
      </div>
    )
  }
}

Teleop.propTypes = {
  team: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  state: PropTypes.object.isRequired,
  actions: PropTypes.func.isRequired,
  setIncrement: PropTypes.func.isRequired,
  toggleDecrement: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
}

export default Teleop
