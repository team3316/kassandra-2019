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
export const getAll = () => dispatch => {
  dispatch(requestRecords)
  fetch('/cycles').then(res => res.json())
    .then(records => dispatch(recieveRecords(records)))
}

export const filterByTeam = team => ({
  type: 'FILTER_BY_TEAM',
  team
})

export const filterByEvent = event => ({
  type: 'FILTER_BY_EVENT',
  event
})

export const filterByEventTeam = (event, team) => dispatch => {
  dispatch(filterByTeam(team))
  dispatch(filterByEvent(event))
}

export const requestByTeam = team => dispatch => {
  dispatch(requestRecords)
  dispatch(filterByTeam(team))
  fetch(`/cycles/team/${team}`).then(res => res.json())
    .then(records => dispatch(recieveRecords(records)))
}

// DEPRECATED
export const rankBy = gameObject => ({
  type: 'RANK_BY',
  rankBy: gameObject
})

/**
 * Requesting and recieving rankings
 */
export const requestRankings = { type: 'REQUEST_RANKINGS' }
export const recieveRankings = rankings => ({
  type: 'RECIEVE_RANKINGS',
  rankings
})

/**
 * Fetches the rankings of the current event from the database
 * @param  {String} event The event to get the rankings of
 */
export const getRankings = event => dispatch => {
  dispatch(requestRecords)
  fetch(`/rankings/stats/event/${event}`).then(res => res.json())
    .then(data => {
      const rankings = data.map(datum =>
        Object.assign({}, datum, { id: datum.team_number }))
      dispatch(recieveRankings(rankings))
    })
}

/**
 * Changing the state to indicate that it's currently requesting graph data
 * @param  {Number} team  The team to get the data of
 * @param  {String} event The event to get the data of
 * @return {Object}       The action, of type 'REQUEST_GRAPHS'
 */
export const requestGraphData = (team, event) => ({
  type: 'REQUEST_GRAPHS',
  team,
  event
})

/**
 * Recieving the graph data from the server
 * @param  {Array}  graphData The data to display in the graphs
 * @return {Object}           D
 */
export const recieveGraphData = graphData => ({
  type: 'RECIEVE_GRAPHS',
  graphData
})

/**
 * Fetching the graph data from the database according to team and event
 * @param  {Number} team  The team to get the graph data of
 * @param  {String} event The event to fetch the data from
 */
export const getGraphData = (team, event) => dispatch => {
  // Indicating the graph data is being fetched for
  dispatch(requestGraphData(team, event))

  // Fetching for events and dispatching them to the store
  fetch(`/team/${team}/event/${event}`).then(res => res.json())
    .then(data => dispatch(recieveGraphData(data)))
}
