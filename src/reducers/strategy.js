import { strategy } from './initial-state.js'

export default strategy = (state = strategy, action) => {
  switch (action.type) {

    /**
     * Requesting and recieving records from the database
     */
    case 'REQUEST_RECORDS':
      return {
        isFetchingRecords: true
      }

    case 'RECIEVE_RECORDS':
      return {
        isFetchingRecords: false,
        records: action.records
      }


  }
}
