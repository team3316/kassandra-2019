/**
 * Dispatches a match object to the store
 * @param  {Object} match A match object, retrieved from The Blue Alliance API
 */
export const selectMatch = match => ({
  type: 'SELECT_MATCH',
  match
})

/**
 * Dispatches team object to the store
 * @param  {Object} team A team object that contains:
 * team.number: {Number} team number
 * team.color: {String} team color
 * team.pos: {Number} team position in the match
 */
export const selectTeam = team => ({
  type: 'SELECT_TEAM',
  team
})

/**
 * Sandstorm actions
 */
export const sandstorm = {
  /**
   * Toggle hab line value
   */
  toggleHab: { type: 'TOGGLE_HAB' },

  /**
   * Togglers for autonomous installations
   */
  togglePanelToCargoShip: { type: 'TOGGLE_SANDSTORM_PANEL_TO_CARGO_SHIP' },
  togglePanelToRocket: { type: 'TOGGLE_SANDSTORM_PANEL_TO_ROCKET' },
  toggleCargoToCargoShip: { type: 'TOGGLE_SANDSTORM_CARGO_TO_CARGO_SHIP' },
  toggleCargoToRocket: { type: 'TOGGLE_SANDSTORM_CARGO_TO_ROCKET' }
}

/**
 * Incrementing and decrementing the teleop states
 */
export const toggleDecrement = { type: 'TOGGLE_DECREMENT' }

export const increment = {
  cargoToCargoShip: { type: 'INCREMENT_CARGO_CARGO_SHIP' },
  cargoToLevel1: { type: 'INCREMENT_CARGO_LEVEL1' },
  cargoToLevel2: { type: 'INCREMENT_CARGO_LEVEL2' },
  cargoToLevel3: { type: 'INCREMENT_CARGO_LEVEL3' },
  panelToCargoShip: { type: 'INCREMENT_PANEL_CARGO_SHIP' },
  panelToLevel1: { type: 'INCREMENT_PANEL_LEVEL1' },
  panelToLevel2: { type: 'INCREMENT_PANEL_LEVEL2' },
  panelToLevel3: { type: 'INCREMENT_PANEL_LEVEL3' }
}

export const decrement = {
  cargoToCargoShip: { type: 'DECREMENT_CARGO_CARGO_SHIP' },
  cargoToLevel1: { type: 'DECREMENT_CARGO_LEVEL1' },
  cargoToLevel2: { type: 'DECREMENT_CARGO_LEVEL2' },
  cargoToLevel3: { type: 'DECREMENT_CARGO_LEVEL3' },
  panelToCargoShip: { type: 'DECREMENT_PANEL_CARGO_SHIP' },
  panelToLevel1: { type: 'DECREMENT_PANEL_LEVEL1' },
  panelToLevel2: { type: 'DECREMENT_PANEL_LEVEL2' },
  panelToLevel3: { type: 'DECREMENT_PANEL_LEVEL3' }
}

/**
 * An exported function that increment/decrements from the state based on parameters
 * @param  {String} type            Where to change the value i.e. 'panelToLevel1'
 * @param  {Boolean} shouldDecrement Should you decrement or increment
 */
export const changeValue = (type, shouldDecrement) => dispatch => {
  if (!shouldDecrement) {
    dispatch(increment[type])
  } else {
    dispatch(decrement[type])
    dispatch(toggleDecrement)
  }
}

/**
 * Sets the state to incrementing
 * Used after moving views
 * @type {Object}
 */
export const setIncrement = { type: 'SET_INCREMENT' }

/**
 * Endgame
 */
export const climb = level => ({
  type: 'CLIMB',
  level
})

export const comment = comment => ({
  type: 'COMMENT',
  comment
})

export const techFouls = { type: 'TOGGLE_TECH_FOULS' }

/**
 * Change the state to show the state of a submit request
 */
const requestSubmit = { type: 'REQUEST_SUBMIT' }

/**
 * Makes a post requsest, and returns a promise to resolve by the user
 * @param  {Object} state The current state of the application
 * @return {Promise}
 */
export const postForm = (match, team, sandstorm, teleop, endgame) => dispatch => {
  dispatch(requestSubmit)

  return fetch('/cycles', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      teamNumber: team.number,
      // If the match is a practice match append the match number to the id
      matchKey: !match.practice ? match.key : match.key + match.number,
      sandstorm: sandstorm,
      teleop: teleop,
      ...endgame,
      climb: endgame.climb.value
    })
  })
}

/**
 * Move the state to the next match
 */
export const nextMatch = matches => ({
  type: 'NEXT_MATCH',
  matches
})
