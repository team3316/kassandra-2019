import React, { Component } from 'react'
import axios from 'axios'

class Example extends Component {
  constructor (props) {
    super(props)

    this.state = {
      value: '',
      show: []
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
      this.setState({ show: data })
      console.log(this.state.show)
    })
  }

  render () {
    return (
      <form>
        <input type='numbers' value={this.state.value} onChange={this.handleChange} />
        <br />
        <button onClick={this.handleClick}>Submit</button>
        <br />
        {this.state.show.map(team => <p>{team}</p>)}
        <br />
        <button onClick={e => this.handleRequest(e)}>Request teams</button>
      </form>
    )
  }
}

export default Example
