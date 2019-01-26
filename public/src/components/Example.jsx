import React, { Component } from 'react'
import axios from 'axios'

class Example extends Component {
  constructor (props) {
    super(props)

    this.state = {
      value: '',
      teams: []
    }

    this.handleClick = this.handleClick.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleClick (e) {
    e.preventDefault()

    axios.post('/teams', { teamNumber: this.state.value })
  }

  handleChange (e) {
    this.setState({ value: e.target.value })
  }

  handleRequest (e) {
    e.preventDefault()

    axios.get('/teams').then(({ data }) => {
      this.setState({ teams: data })
      console.log(this.state.teams)
    })
  }

  handlePost (e) {
    e.preventDefault()

    axios.post('/cycles', {
      teamNumber: 3316,
      matchId: '2018isde1qm1',
      sandstorm: {
        controlMethod: 'autonomous',
        cargoShipPanels: true,
        cargoShipCargo: false,
        rocketPanels: false,
        rocketCargo: false
      },
      teleop: {
        cargo: {
          cargoShip: 20,
          level1: 20,
          level2: 20,
          level3: 20
        },
        panels: {
          cargoShip: 20,
          level1: 20,
          level2: 20,
          level3: 20
        }
      },
      endgame: 'lvl1',
      comments: 'הקבוצה הכי טובה נודרררררר',
      tech_fouls: false
    })
  }

  handlePut (e) {
    e.preventDefault()

    axios.put('/cycles/visibility', { id: 6 })
  }

  render () {
    return (
      <form>
        <input type='numbers' value={this.state.value} onChange={this.handleChange} />
        <br />
        <button onClick={this.handleClick}>Submit</button>
        <br />
        {this.state.teams.map(team => <p>{team}</p>)}
        <br />
        <button onClick={e => this.handleRequest(e)}>Request teams</button>
        <br />
        <button onClick={e => this.handlePost(e)}>Post Match</button>
        <br />
        <button onClick={e => this.handlePut(e)}>Toggle visibility</button>
      </form>
    )
  }
}

export default Example
