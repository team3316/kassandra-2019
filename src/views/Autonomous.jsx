import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { DropdownV2 as Dropdown } from 'carbon-components-react'
import { GiSightDisabled } from 'react-icons/gi'
import Header from '../components/Header.jsx'

class Autonomous extends Component {
  componentDidMount () {
    document.title = 'Kassandra - Autonomous'
  }

  render () {
    const habLine = [<span> text </span>]

    const {
      team,
      selectedMatch
    } = this.props

    return (
      <div id='auto'>
        <Header color={team.color}>
          <span> {`${selectedMatch.name} | ${team.label}`} </span>
        </Header>

        <div className='content'>
          <div className={`pageTitle ${team.color}Team}`}>
            <GiSightDisabled />
            <h1>Sandstorm </h1>
          </div>
        </div>
      </div>
    )
  }
}

Autonomous.propTypes = {
  team: PropTypes.object.isRequired,
  selectedMatch: PropTypes.object.isRequired
}

export default Autonomous
