import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

class TeamInsert extends Component {
  constructor (props) {
    super(props)

    this.handleTextChange = this.handleTextChange.bind(this)
  }

  /**
   * Moves parameter to the Team component
   * @param {event} e text change event
   */
  handleTextChange (e) {
    this.props.onTextChange(e.target.value)
  }

  /**
   * Failed attempt at logging a response from the server
   */
  onClick () {
    console.log('TeamInsert.onClick')
    axios({
      method: 'get',
      url: '/test'
    }).then(res => res.txt()).then(text => console.log(text))
  }

  render () {
    return (
      <form>
        <input type='text' onChange={this.handleTextChange} placeholder='Enter team name' />
        <button onClick={this.onClick}>Submit</button>
      </form>
    )
  }
}

/**
 * Gets props.team and shows it in a paragraph element
 */
class TeamShow extends Component {
  render () {
    return (
      <p>{this.props.team}</p>
    )
  }
}

/**
 * Container component for TeamShow and TeamInsert
 */
class Team extends Component {
  constructor (props) {
    super(props)

    /**
     * this.state.value contains the search bar value
     */
    this.state = {
      value: ''
    }

    this.handleTextChange = this.handleTextChange.bind(this)
  }

  /**
   * Changes state.value to the search bar value
   * @param {string} searchValue the value of the search bar
   */
  handleTextChange (searchValue) {
    this.setState({ value: searchValue })
    console.log(searchValue)
  }

  render () {
    return (
      <div>
        <TeamInsert onTextChange={this.handleTextChange} />
        <TeamShow team={this.state.value} />
      </div>
    )
  }
}

ReactDOM.render(<Team />, document.querySelector('#root'))
