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
 * Toggle hab line value
 */
export const toggleHab = { type: 'TOGGLE_HAB' }

/**
 * Togglers for autonomous installations
 */
export const toggleAutoPanelCargoShip = { type: 'TOGGLE_AUTO_PANEL_CARGO_SHIP' }
export const toggleAutoPanelRocket = { type: 'TOGGLE_AUTO_PANEL_ROCKET' }
export const toggleAutoCargoCargoShip = { type: 'TOGGLE_AUTO_CARGO_CARGO_SHIP' }
export const toggleAutoCargoRocket = { type: 'TOGGLE_AUTO_CARGO_ROCKET' }

/**
 * Incrementing and decrementing the teleop states
 */
export const toggleDecrement = { type: 'TOGGLE_DECREMENT' }

export const incrementCargoCargoShip = { type: 'INCREMENT_CARGO_CARGO_SHIP' }
export const incrementCargoLevel1 = { type: 'INCREMENT_CARGO_LEVEL1' }
export const incrementCargoLevel2 = { type: 'INCREMENT_CARGO_LEVEL2' }
export const incrementCargoLevel3 = { type: 'INCREMENT_CARGO_LEVEL3' }
export const incrementPanelCargoShip = { type: 'INCREMENT_PANEL_CARGO_SHIP' }
export const incrementPanelLevel1 = { type: 'INCREMENT_PANEL_LEVEL1' }
export const incrementPanelLevel2 = { type: 'INCREMENT_PANEL_LEVEL2' }
export const incrementPanelLevel3 = { type: 'INCREMENT_PANEL_LEVEL3' }

export const decrementCargoCargoShip = { type: 'DECREMENT_CARGO_CARGO_SHIP' }
export const decrementCargoLevel1 = { type: 'DECREMENT_CARGO_LEVEL1' }
export const decrementCargoLevel2 = { type: 'DECREMENT_CARGO_LEVEL2' }
export const decrementCargoLevel3 = { type: 'DECREMENT_CARGO_LEVEL3' }
export const decrementPanelCargoShip = { type: 'DECREMENT_PANEL_CARGO_SHIP' }
export const decrementPanelLevel1 = { type: 'DECREMENT_PANEL_LEVEL1' }
export const decrementPanelLevel2 = { type: 'DECREMENT_PANEL_LEVEL2' }
export const decrementPanelLevel3 = { type: 'DECREMENT_PANEL_LEVEL3' }

/**
 * Endgame
 */
export const climb = level => ({
  type: 'CLIMB',
  level
})
