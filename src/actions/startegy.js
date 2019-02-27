/**
 * Request for events
 */
export const requestRecords = { type: 'REQUEST_RECORDS' }

/**
 * Recieve events
 * @param  {Array} records The records that should be updated the state
 */
export const recieveRecords = records => ({
  type: 'RECIEVE_RECORDS',
  records
})

/**
 * Get all records from the database
 * @param  {Function} dispatch Dispatching to the state
 */
export const getAll = dispatch => {
  dispatch(requestRecords)
  fetch('/cycles').then(res => res.json())
    .then(records => dispatch(recieveRecords(records)))
}
