import React, { Component } from 'react'

export default class Matchlist extends Component {
  render () {
    const { matches, selectedTeam } = this.props

    /** @type {Array} table headers for the match list */
    const headers = ['Match', 'Red 1', 'Red 2', 'Red 3', 'Blue 1', 'Blue 2', 'Blue 3']

    /** Filters the matches according to the filter */
    const filter = match => {
      for (let i in match.alliances.red.team_keys) {
        /** Searches for the team in both alliances */
        if (match.alliances.red.team_keys[i].search(selectedTeam) > -1 ||
          match.alliances.blue.team_keys[i].search(selectedTeam) > -1) {
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
              {
                /**
                 * If the match is a qualification match the set number doesn't matter
                 */
                match.comp_level === 'QM'
                  ? <td key={match.key}>QM{match.match_number}</td>
                  : <td key={match.key}>{match.comp_level}{match.match_number}M{match.set_number}</td>
              }

              {
                /**
                 * Red teams
                 */
                match.alliances.red.team_keys.map((team, index) => {
                  /**
                   * Filters the teams
                   */
                  if (team.search(selectedTeam) > -1 && selectedTeam !== '') {
                    return <td
                      key={'Red' + (index++)}
                      className='red bold'
                    >
                      {team}
                    </td>
                  } else {
                    return <td
                      key={'Red' + (index++)}
                      className='red'
                    >
                      {team}
                    </td>
                  }
                })}

              {
                /**
                 * Blue teams
                 */
                match.alliances.blue.team_keys.map((team, index) => {
                  /**
                   * Filters the teams
                   */
                  if (team.search(selectedTeam) > -1 && selectedTeam !== '') {
                    return <td
                      key={'Blue' + (index++)}
                      className='blue bold'
                    >
                      {team}
                    </td>
                  } else {
                    return <td
                      key={'Blue' + (index++)}
                      className='blue'
                    >
                      {team}
                    </td>
                  }
                })
              }
            </tr>)}
        </tbody>
      </table>
    )
  }
}
