import { strategy } from './initial-state.js'

export default (state = strategy, action) => {
  switch (action.type) {
    /**
     * Requesting and recieving records from the database
     */
    case 'REQUEST_RECORDS':
      return {
        ...state,
        isFetchingRecords: true
      }

    /**
     * Recieving records from the database
     * @param {Array} action.records database records
     */
    case 'RECIEVE_RECORDS':
      /**
       * List of events taken from the matchKey
       * Removes year and match key
       */
      let events = action.records.map(({ matchKey }) =>
        matchKey.replace(/_.*/, '').toUpperCase())
      /** Filters out duplicates */
      events = events.filter((event, index) => events.indexOf(event) === index)

      /**
       * List of teams taken from the records
       * Filtered to remove duplicates
       */
      let teams = action.records.map(({ teamNumber }) => String(teamNumber))
      teams = teams.filter((team, index) => teams.indexOf(team) === index)
      teams = teams.sort((a, b) => Number(a) - Number(b))

      const matches = action.records.map(match => ({
        ...match,
        teamNumber: String(match.teamNumber),
        eventKey: match.matchKey.replace(/_.*/, '')
      }))

      return {
        ...state,
        isFetchingRecords: false,
        matches,
        teams,
        events
      }

    case 'FILTER_BY_TEAM':
      return {
        ...state,
        team: action.team
      }

    /**
     * Filters the records by an event
     * @param {Object} action.event event to filter by
     */
    case 'FILTER_BY_EVENT':
      return {
        ...state,
        event: action.event
      }

    case 'REQUEST_RANKINGS':
      return {
        ...state,
        isFetchingRankings: true
      }

    case 'RECIEVE_RANKINGS':
      return {
        ...state,
        rankings: action.rankings,
        isFetchingRankings: false
      }

    default:
      return state
  }
}
