// import React from '../../../node_modules/react'
// import ReactDOM from '../../../node_modules/react-dom'

const nba = [{
  'Name': 'Toronto',
  'W': 23,
  'L': 8
}, {
  'Name': 'Milwaukee',
  'W': 19,
  'L': 9
}]

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

ReactDOM.render(<RankingsTable teams={nba} />, document.selectQuery('#root'))
