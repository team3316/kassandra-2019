import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'carbon-components-react'
import {
  GiSightDisabled as SightDisabled,
  GiJoystick as Controller,
  GiSailboat as Sailboat,
  GiPlainCircle as Cargo,
  GiCompactDisc as Panel
} from 'react-icons/gi'
import { IoIosRocket as Rocket } from 'react-icons/io'

/**
 * A component to list teleop game installations of a game object
 * @param  {Object} match      The record object
 * @param  {String} gameObject The game object to show
 */
const Installations = ({ match, gameObject }) => {
  const installs = match.teleop[gameObject]

  return (
  <div className={gameObject}>
    <p> <Sailboat /> Cargoship: { installs.cargoShip } </p>
    <p> Level I: { installs.level1 } </p>
    <p> Level II: { installs.level2 } </p>
    <p> Level III: { installs.level3 } </p>
  </div>
  )
}


/**
 * A component that visualises in a paragraph the record data
 */
class Record extends React.Component {
  constructor (props) {
    super(props)
    this.state = { visible: this.props.match.visible }
  }

  render () {
    const { match } = this.props

    return (
      <div key={match.id}>
        <h3> { match.matchKey.toUpperCase().replace('_', ' ') } </h3>
        <Button onClick={() => {
          /**
           * Changes the cycle's visibility in the database
           * Sets the visible state when the server responds
           */
          fetch('/cycles/visibility', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: match.id })
          }).then(res => res.json())
            .then(({ visible }) => this.setState({ visible }))
        }}>
          { this.state.visible ? 'Hide' : 'Show' }
        </Button>

        <p> Match key: {match.matchKey} </p>

        <p> Event: {match.eventKey} </p>

        <p> <SightDisabled /> Sandstorm </p>

        <p style={{ color: match.sandstorm.cargoToCargoShip ? '#2ecc71' : '#e74c3c' }}>
          <Cargo /> Cargo to <Sailboat /> cargo ship: { match.sandstorm.cargoToCargoShip ? 'true' : 'false'}
        </p>

        <p style={{ color: match.sandstorm.cargoToRocket ? '#2ecc71' : '#e74c3c' }}>
          <Cargo /> Cargo to <Rocket /> rocket: { match.sandstorm.cargoToRocket ? 'true' : 'false'}
        </p>

        <p style={{ color: match.sandstorm.panelToCargoShip ? '#2ecc71' : '#e74c3c' }}>
          <Panel /> Panel to <Sailboat /> cargo ship: { match.sandstorm.panelToCargoShip ? 'true' : 'false'}
        </p>

        <p style={{ color: match.sandstorm.panelToRocket ? '#2ecc71' : '#e74c3c' }}>
          <Panel /> Panel to <Rocket /> rocket: { match.sandstorm.panelToRocket ? 'true' : 'false'}
        </p>

        <p> <Controller /> Teleop </p>

        <p> <Cargo /> Cargo: </p>
        <Installations match={match} gameObject='cargo' />

        <p> <Panel /> Panels: </p>
        <Installations match={match} gameObject='panels' />
      </div>
    )
  }
}

Record.propTypes = {
  match: PropTypes.object.isRequired,
  getAll: PropTypes.object.isRequired
}

export default Record
