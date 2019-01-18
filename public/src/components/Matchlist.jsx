import React, { Component } from 'react'

export default class Matchlist extends Component {
  render () {
    const { matches, selectedTeam } = this.props

    const headers = ['Match', 'Red 1', 'Red 2', 'Red 3', 'Blue 1', 'Blue 2', 'Blue 3']

    const filter = match => {
      for (let i in match.alliances.red.team_keys) {
        if (match.alliances.red.team_keys[i].search(selectedTeam) > -1 || match.alliances.blue.team_keys[i].search(selectedTeam) > -1) {
          return true
        }
      }

      return false
    }

    const filteredMatches = matches.filter(match => filter(match))

    return (
      <table>
        <thead>
          <tr>{headers.map(header => <th key={header}> {header} </th>)}</tr>
        </thead>

        <tbody>
          {filteredMatches.map(match =>
            <tr key={match.key}>
              {match.comp_level === 'QM'
                ? <td key={match.key}>QM{match.match_number}</td>
                : <td key={match.key}>{match.comp_level}{match.match_number}M{match.set_number}</td>
              }

              {
                match.alliances.red.team_keys.map((team, index) => {
                  if (team.search(selectedTeam) > -1 && selectedTeam !== '') {
                    return <td
                      key={'Red' + (index++)}
                      style={{ 'fontWeight': 'bold' }}
                    >
                      {team}
                    </td>
                  } else {
                    return <td key={'Red' + (index++)}>{team}</td>
                  }
                })}

              {
                match.alliances.blue.team_keys.map((team, index) => {
                  if (team.search(selectedTeam) > -1 && selectedTeam !== '') {
                    return <td key={'Blue' + (index++)} style={{ 'fontWeight': 'bold' }}>{team}</td>
                  } else {
                    return <td key={'Blue' + (index++)}>{team}</td>
                  }
                })
              }
            </tr>)}
        </tbody>
      </table>
    )
  }
}