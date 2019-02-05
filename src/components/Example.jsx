import React, { Component } from 'react'
import { Button } from 'carbon-components-react'

class Example extends Component {
  constructor (props) {
    super(props)

    this.state = {
      value: '',
      teams: []
    }
  }

  handlePost (e) {
    e.preventDefault()

    fetch('/cycles', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        teamNumber: 3316,
        matchId: '2018isde1qm1',
        'sandstorm': {
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
    }).then(res => console.log(res))
  }

  handlePut (e) {
    e.preventDefault()

    fetch('/cycles/visibility', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: { id: 6 }
    }).then(res => res.json()).then(json => console.log(JSON.stringify(json, null, 2)))
  }

  render () {
    return (
      <form>
        <Button onClick={e => this.handlePost(e)}>Post Match</Button>
        <br />
        <Button onClick={e => this.handlePut(e)}>Toggle visibility</Button>
      </form>
    )
  }
}

export default Example
