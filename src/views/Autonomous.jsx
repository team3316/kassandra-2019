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
import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'

class Autonomous extends Component {
  render () {
    document.title = 'Kassandra - Autonomous'

    const {
      team,
      selectedMatch,
      toggleHab
    } = this.props

    return (
      <div id='auto'>
        <Header color={team.color}>
          <span> {`${selectedMatch.name} | ${team.label}`} </span>
        </Header>

        <div className='content noselect'>
          <div className={`pageTitle ${team.color}Team`}>
            <SightDisabled />
            <h1>Sandstorm </h1>
          </div>

          <div className='form'>
            <Checkbox
              id={`habLine ${team.color}`}
              className='test'
              labelText='Hab line'
              onChange={() => toggleHab()}
            />

            <div className='buttons'>
              <div className='column'>
                <span className='title'> <Cargo /> Cargo </span>
                <Button className={team.color}> <Sailboat /> Ship </Button>
                <Button className={team.color}>  <Rocket /> Rocket </Button>
              </div>

              <div className='column'>
                <span className='title'> <Panel /> Hatch Panels </span>
                <Button className={team.color}> <Sailboat /> Ship </Button>
                <Button className={team.color}>  <Rocket /> <span> Rocket </span> </Button>
              </div>
            </div>
          </div>
        </div>

        <Footer> <Link to='/teleop'> <Button> Teleop </Button> </Link> </Footer>
      </div>
    )
  }
}

Autonomous.propTypes = {
  team: PropTypes.object.isRequired,
  selectedMatch: PropTypes.object.isRequired,
  toggleHab: PropTypes.func.isRequired
}

export default Autonomous
