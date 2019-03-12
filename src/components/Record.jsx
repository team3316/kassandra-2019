import React from 'react'
import PropTypes from 'prop-types'
import { AccordionItem, Button } from 'carbon-components-react'
import {
  GiSightDisabled as SightDisabled,
  GiJoystick as Controller,
  GiSailboat as Sailboat,
  GiPlainCircle as Cargo,
  GiCompactDisc as Panel,
  GiStairsGoal as Stairs
} from 'react-icons/gi'
import { FiShield as Shield } from 'react-icons/fi'
import { IoIosRocket as Rocket } from 'react-icons/io'

/**
 * A component to list teleop game installations of a game object
 * Shows number of installations if it's greater than one
 * @param  {Object} match      The record object
 * @param  {String} gameObject The game object to show
 */
const Installations = ({ match, gameObject }) => {
  /**
   * An array containing the amount of installs of single game piece to all places on the field
   * @type {Array}
   */
  const installs = match.teleop[gameObject]
  /**
   * A function that returns styling for each installation place
   * If the robot installed to that place it sets display: 'block'
   * If not, it sets display: 'none'
   * @param  {Number} amount Amount of installations to that level
   * @return {Object}        Stylings for the row containing installation number
   */
  const showInstalls = amount => amount > 0 ? { display: 'block' } : { display: 'none' }

  return (
    <div className={gameObject}>
      <p style={showInstalls(installs.cargoShip)}> <Sailboat /> Cargoship: { installs.cargoShip } </p>
      <p style={showInstalls(installs.level1)}> Level I: { installs.level1 } </p>
      <p style={showInstalls(installs.level2)}> Level II: { installs.level2 } </p>
      <p style={showInstalls(installs.level3)}> Level III: { installs.level3 } </p>
    </div>
  )
}

Installations.propTypes = {
  match: PropTypes.object.isRequired,
  gameObject: PropTypes.string.isRequired
}

const Defence = ({ defence }) => {
  const { state, comment, offender } = defence

  return (
    <div className='defence'>
      {
        state === 'non'
          ? <div className='empty' />
          : <div>
          <span className='title'> <Shield /> Defence </span>
          </div>
      }
    </div>
  )
}

/**
 * A component that visualises in a paragraph the record data
 */
class Record extends React.Component {
  constructor (props) {
    super(props)
    /** The visibility state is fetched from the database */
    this.state = { visible: this.props.match.visible }
  }

  render () {
    const { match } = this.props

    /**
     * Determines whether or not the sandstorm installation should be shown
     * @param  {Boolean} object Whether or not the team installed
     * @return {Object}         A stylings object setting whether or not its should be shown
     */
    const showSandstorm = object => object ? { display: 'block', color: '#2ecc71' } : { display: 'none' }

    const getTitle = isVisible => match.matchKey.toUpperCase().replace('_', ' ') + (!isVisible
      ? ' [HIDDEN]' : ''
    )

    return (
      <AccordionItem
        key={match.id}
        title={getTitle(this.state.visible)}
      >
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

        <p style={showSandstorm(match.sandstorm.cargoToCargoShip)}>
          <Cargo /> Cargo to <Sailboat /> cargo ship
        </p>

        <p style={showSandstorm(match.sandstorm.cargoToRocket)}>
          <Cargo /> Cargo to <Rocket /> rocket
        </p>

        <p style={showSandstorm(match.sandstorm.panelToCargoShip)}>
          <Panel /> Panel to <Sailboat /> cargo ship
        </p>

        <p style={showSandstorm(match.sandstorm.panelToRocket)}>
          <Panel /> Panel to <Rocket /> rocket
        </p>

        <p> <Controller /> Teleop </p>

        <p> <Cargo /> Cargo: </p>
        <Installations match={match} gameObject='cargo' />

        <p> <Panel /> Panels: </p>
        <Installations match={match} gameObject='panels' />

        <p> <Stairs /> Climb: {match.climb} </p>

        <p style={{
          display: match.techFouls ? 'block' : 'none',
          color: '#e74c3c'
        }}>
          The team has comitted a foul in this match </p>

        <p style={{ display: match.comment === '' || match.comment == null ? 'none' : 'block' }}>
          Comments: {match.comment} </p>

      </AccordionItem>
    )
  }
}

Record.propTypes = {
  match: PropTypes.object.isRequired
}

export default Record
