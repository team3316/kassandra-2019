import { strategy } from './initial-state.js'

export default strategy = (state = strategy, action) => {
  switch (action.type) {
    /**
     * Requesting and recieving records from the database
     */
    case 'REQUEST_RECORDS':
      return { isFetchingRecords: true }

    /**
     * Recieving records from the database
     * @param {Array} action.records database records
     */
    case 'RECIEVE_RECORDS':
      /**
       * List of events taken from the match_key
       * Removes year and match, then removes duplicates
       */
      let events = action.records.map(({ match_key }) =>
        match_key.replace(/_.*/, '')).replace(/\d{4}|_.*/, '')

      events = events.filter((event, index) => events.indexOf(event) === index)

      return {
        isFetchingRecords: false,
        records: action.records,
        events
      }

    case 'FILTER_BY_TEAM':
      return { team: action.team }

    /**
     * Filters the records by an event
     * @param {Object} action.event event to filter by
     */
    case 'FILTER_BY_EVENT':
      return { event: action.event }
  }
}
