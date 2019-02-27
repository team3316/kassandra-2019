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
      return {
        isFetchingRecords: false,
        records: action.records
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
