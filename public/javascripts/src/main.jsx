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
 * The RankingsHeader component represents the table header, has an
 */
class RankingsHeader extends React.Component {
  render () {
    const title = this.props.title
    console.log(title + ' rendered')
    return (
      <th onClick={title => this.props.handleClick(title)}> {title} </th>
    )
  }
}

/**
 * The RankingsTable component contains the table headers and the rows
 * Each header is a RankingsHeader component and each row is a RankingsRow component
 */
class RankingsTable extends React.Component {
  render () {
    const headerTitles = ['Team', 'W', 'L', 'W%']

    const headers = headerTitles.map((title, index) => <RankingsHeader
      title={title}
      key={index}
      handleClick={title => this.props.handleClick(title)} />)
    const rows = this.props.teams.map((team, index) => <RankingsRow team={team} key={index} />)

    return (
      <table>
        <thead> {headers} </thead>
        <tbody> {rows} </tbody>
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
        <td> {team.WPercent} </td>
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

    this.standings = this.props.teams.map(function (team) {
      team.WPercent = 100 * team.W / (team.W + team.L)
      return team
    })
  }

  // this.handleChange = this.handleChange.bind(this)

  // handleChange (event) {
  //   this.setState({ value: event.target.value })
  // }

  sortBy (array, key) {
    return array.sort((a, b) => b[key] - a[key])
  }

  handleClick (title, array) {
    console.log(title + ' clicked')
    return this.sortBy(array, title)
  }

  addWinPercent (team) {
    team.WPercent = 100 * team.W / (team.W + team.L)
    return team
  }

  render () {
    // .setState({ teams: teams.map(team => this.addWinPercent(team)) })
    console.log(this.sortBy(this.standings, 'WPercent'))
    return (
      <div>
        <SearchBar />
        <RankingsTable
          teams={this.standings}
          handleClick={title => this.handleClick(title, this.standings)}
        />
      </div>
    )
  }
}

ReactDOM.render(<FilterableRankingTable teams={nba} />, document.querySelector('#root'))
