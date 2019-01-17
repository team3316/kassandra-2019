import React, { Component } from 'react'
import axios from 'axios'

class Example extends Component {
  constructor (props) {
    super(props)

    this.state = {
      value: '',
      show: ''
    }

    this.handleClick = this.handleClick.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleClick (e) {
    e.preventDefault()

    axios.post('/team', { teamNumber: this.state.value })
  }

  handleChange (e) {
    this.setState({ value: e.target.value })
  }

  render () {
    return (
      <form>
        <input type='numbers' value={this.state.value} onChange={this.handleChange} />
        <br />
        <button onClick={this.handleClick}>Submit</button>
        <br />
        <p>{this.state.show}</p>
      </form>
    )
  }
}

export default Example
