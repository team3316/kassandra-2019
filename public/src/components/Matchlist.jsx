import React, { Component } from 'react'

export default class Matchlist extends Component {
  render () {
    const { matches } = this.props

    const headers = ['Match', 'Red 1', 'Red 2', 'Red 3', 'Blue 1', 'Blue 2', 'Blue 3']

    return (
      <div>
        <table>
          <thead>
            <tr>{headers.map(header => <th key={header}> {header} </th>)}</tr>
          </thead>

          <tbody>
            {matches.map(match =>
              <tr key={match.key}>
                {match.comp_level === 'QM'
                  ? <td>QM{match.match_number}</td>
                  : <td>{match.comp_level}{match.match_number}M{match.set_number}</td>
                }

                {
                  match.alliances.red.team_keys.map(team => <td>{team}</td>)
                }

                {
                  match.alliances.blue.team_keys.map(team => <td>{team}</td>)
                }
              </tr>)}
          </tbody>
        </table>
      </div>
    )
  }
}
