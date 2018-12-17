/**
 * 
 */
import React from 'react'
import ReactDOM from 'react-dom'
/**
 * NBA is an array of objects, each objects contains the NBA team name, their wins number and theirs losses number
 * @type {Array}
 */
const nba = [{
  'Name': 'Toronto',
  'W': 23,
  'L': 8
}, {
  'Name': 'Milwaukee',
  'W': 19,
  'L': 9
}]

/**
 * The RankingsTable component contains the table headers and the rows. Each row is a RankingsRow component
 */
class RankingsTable extends React.Component {
  render () {
    const rows = this.props.teams.map((team, index) => <RankingsRow team={team} key={index} />)

    return (
      <table>
        <thead>
          <th> Team </th>
          <th> W </th>
          <th> L </th>
          <th> W% </th>
        </thead>

        <tbody>{rows}</tbody>
      </table>
    )
  }
}

class RankingsRow extends React.Component {
  render () {
    const team = this.props.team

    return (
      <tr>
        <td> {team.Name} </td>
        <td> {team.W} </td>
        <td> {team.L} </td>
        <td> {100 * team.W / (team.W + team.L) } </td>
      </tr>
    )
  }
}

class SearchBar extends React.Component {
  render () {
    return (
      <input type='text' placeholder='Filter by team' />
    )
  }
}

class FilterableRankingTable extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      value: ''
    }

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (event) {
    this.setState({ value: event.target.value })
  }

  render () {
    return (
      <div>
        <SearchBar />
        <RankingsTable teams={this.props.teams} />
      </div>
    )
  }
}

ReactDOM.render(<FilterableRankingTable teams={nba} />, document.querySelector('#root'))
