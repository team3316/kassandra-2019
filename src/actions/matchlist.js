/**
 * Blue Alliance fetch function
 * @param {String} url The api url it fetches from e.g. /district/2018isr/events
 *
 */
const blueAlliance = url => fetch(`https://www.thebluealliance.com/api/v3${url}`, {
  mode: 'cors',
  method: 'GET',
  headers: { 'X-TBA-Auth-Key': process.env.TBA_AUTH }
}).then(res => res.json())

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
 * @return {Object}        Action
 */
export const recieveEvents = (districtKey, events) => ({
  type: 'RECIEVE_EVENTS',
  events,
  districtKey
})

/**
 * Return an action with the type 'REQUEST_MATCHES',
 * setting the corresponding state to fetching and sets the eventKey
 * @param  {String} eventKey The Blue Alliance key for the selected event
 * @return {Object}          Action
 */
export const requestMatches = event => ({
  type: 'REQUEST_MATCHES',
  event
})

export const recieveMatches = (event, matches) => ({
  type: 'RECIEVE_MATCHES',
  event,
  matches
})

/**
 * Fetches matches, trim 'frc' from team numbers and dispatches to store
 */
export const getMatches = event => dispatch => {
  dispatch(requestMatches(event))

  return blueAlliance(`/event/${event.key}/matches`)
    .then(data => {
      /**
      * Sorts matches by the time they were played in
      */
      data.sort((a, b) => a.time - b.time)

      const matches = data.map((match, index) => {
        const newMatch = match

        /**
         * Removes 'frc' from team_keys
         * For example: 'frc3316' => '3316'
         */
        newMatch.alliances.red.team_keys = newMatch.alliances.red.team_keys
          .map(teamKey => teamKey.replace('frc', ''))
        newMatch.alliances.blue.team_keys = newMatch.alliances.blue.team_keys
          .map(teamKey => teamKey.replace('frc', ''))

        /**
         * Sets name to show in the dropdown
         * For example: Quals 33, Finals 1 Match 2
         */
        switch (newMatch.comp_level) {
          case 'qm':
            newMatch.name = `Quals ${newMatch.match_number}`
            break
          case 'qf':
            newMatch.name = `Quarters ${newMatch.set_number} Match ${newMatch.match_number}`
            break
          case 'sf':
            newMatch.name = `Semis ${newMatch.set_number} Match ${newMatch.match_number}`
            break
          case 'f':
            newMatch.name = `Finals ${newMatch.set_number} Match ${newMatch.match_number}`
            break
        }

        /**
         * Sets comp_level to upper case
         * For example: 'qm' => 'QM'
         */
        newMatch.comp_level = newMatch.comp_level.toUpperCase()
        newMatch.index = index

        return newMatch
      })

      dispatch(recieveMatches(event, matches))
    })
}

/**
 * Gets event list for current district, and dispatches to store
 * @param  {String} districtKey The Blue Alliance key for the selected district
 * @return {[type]}             [description]
 */
export const getEvents = districtKey => dispatch => {
  /** Change the state fetching events */
  dispatch(requestEvents(districtKey))

  /** Fetching events */
  return blueAlliance(`/district/${districtKey}/events/simple`)
    .then(data => {
      const events = []

      for (let i in data) {
        events[i] = data[i]

        // Removes ***See site for more detailes***
        events[i].name = events[i].name.replace(/\s*\*.*\*/, '')
      }

      // Sorts events by start date
      events.sort((a, b) => {
        /** If the months are the same, compare days */
        if (a.start_date.charAt(6) === b.start_date.charAt(6)) {
          return Number(a.start_date.charAt(8) + a.start_date.charAt(9)) -
            Number(b.start_date.charAt(8) + b.start_date.charAt(9))
        } else {
          return Number(a.start_date.charAt(6)) - Number(b.start_date.charAt(6))
        }
      })

      dispatch(recieveEvents(districtKey, events))
    })
}

/**
 * Dispatches team to filter by to the store
 * @param  {String} teamNumber Team number in string
 */
export const filterMatchesByTeam = teamNumber => ({
  type: 'FILTER_MATCHES',
  team: teamNumber
})
