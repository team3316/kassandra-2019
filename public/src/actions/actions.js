import axios from 'axios'
/**
 * Blue Alliance axios instance
 */

const blueAlliance = axios.create({
  baseURL: 'https://www.thebluealliance.com/api/v3',
  headers: { 'X-TBA-Auth-Key': process.env.TBA_AUTH }
})

/**
 * Actions
 */

export const requestEvents = districtKey => ({
  type: 'REQUEST_EVENTS',
  districtKey
})

/**
 * Recieves event list of the specified district
 * @param  {Object} events List of events
 * @return {Object}        State
 */
export const recieveEvents = (districtKey, events) => ({
  type: 'RECIEVE_EVENTS',
  events,
  districtKey
})

/**
 * Return an action with the type 'REQUEST_MATCHES', setting the corresponding state to fetching and sets the eventKey
 * @param  {[type]} eventKey [description]
 * @return {[type]}          [description]
 */
export const requestMatches = eventKey => ({
  type: 'REQUEST_MATCHES',
  eventKey
})

export const recieveMatches = (eventKey, matches) => ({
  type: 'RECIEVE_MATCHES',
  eventKey,
  matches
})

export const getMatches = eventKey => dispatch => {
  dispatch(requestMatches(eventKey))

  return blueAlliance.get(`/event/${eventKey}/matches/simple`)
    .then(({ data }) => {
      const matches = []

      for (let i in data) {
        matches[i] = data[i]

        // Capitalizes comp_level
        matches[i].comp_level = matches[i].comp_level.toUpperCase()

        // Removes 'frc' from team_keys
        matches[i].alliances.red.team_keys = matches[i].alliances.red.team_keys
          .map(teamKey => teamKey.replace('frc', ''))
        matches[i].alliances.blue.team_keys = matches[i].alliances.blue.team_keys
          .map(teamKey => teamKey.replace('frc', ''))
      }

      // Sort matches
      matches.sort((a, b) => a.actual_time - b.actual_time)

      dispatch(recieveMatches(eventKey, matches))
    })
}

/** Gets district events and makes a get request */
export const getEvents = districtKey => dispatch => {
  dispatch(requestEvents(districtKey))

  return blueAlliance.get(`/district/${districtKey}/events/simple`)
    .then(({ data }) => {
      const events = []

      for (let i in data) {
        events[i] = {}

        // Removes ***See site for more detailes***
        events[i].name = data[i].name.replace(/\s*\*.*\*/, '')
        events[i].key = data[i].key
      }
      // Moves District Championship to the end of the list
      events.push(events.shift())

      dispatch(recieveEvents(districtKey, events))
    })
}

export const selectTeam = teamNumber => ({
  type: 'SELECT_TEAM',
  team: teamNumber
})
