/**
 * Cycle getters
 */
const { Op } = require('sequelize')
const { Cycle } = require('../db')

/**
 * formatCycles formats the array of cycles returned by the database
 * @param  {Object} cycle A cycle object from the database
 * @return {Object}       Formatted cycle object
 */
const formatCycle = cycle => ({
  matchKey: cycle.match_key,
  teamNumber: cycle.team_number,
  sandstorm: {
    habLine: cycle.sandstorm_hab_line,
    cargoToCargoShip: cycle.sandstorm_cargo_to_cargo_ship,
    cargoToRocket: cycle.sandstorm_cargo_to_rocket,
    panelToCargoShip: cycle.sandstorm_panel_to_cargo_ship,
    panelToRocket: cycle.sandstorm_panel_to_rocket
  },
  teleop: {
    cargo: {
      cargoShip: cycle.teleop_cargo_to_ship,
      level1: cycle.teleop_cargo_to_level1,
      level2: cycle.teleop_cargo_to_level2,
      level3: cycle.teleop_cargo_to_level3
    },
    panels: {
      cargoShip: cycle.teleop_panels_to_ship,
      level1: cycle.teleop_panels_to_level1,
      level2: cycle.teleop_panels_to_level2,
      level3: cycle.teleop_panels_to_level3
    }
  },
  comment: cycle.comment,
  climb: cycle.climb,
  techFouls: cycle.tech_fouls
})

/**
 * Formats an entire array of cycles for the response body
 * @param  {Array} cycles Array of cycles return from the database
 * @return {Array}        Array of formatted cycles
 */
const formatCycles = cycles => cycles.map(formatCycle)

/**
 * Get all cycles in the database
 */
const getCycles = (req, res) =>
  Cycle.findAll().then(cycles => res.json(formatCycles(cycles)))

/**
 * Gets eventKey as a url parameter
 * Returns the cycles in the event
 */
const getCyclesByEvent = (req, res) => {
  Cycle.findAll({ where:
    { match_id: { [Op.regex]: req.params.eventKey } }
  })
    .then(cycles => res.json(formatCycles(cycles)))
}

/**
 * Gets teamNumber as a url parameter
 * Returns the cycles the team has
 */
const getCyclesByTeam = (req, res) => {
  Cycle.findAll({ where: { team_number: req.body.team_number } })
    .then(cycles => res.json(formatCycles(cycles)))
}

/**
 * Gets teamNumber and eventKey as url parameters
 * Returns the cycles the team has in the event
 */
const getCyclesByEventTeam = (req, res) => {
  Cycle.findAll({ where: {
    match_id: { [Op.regex]: req.params.eventKey },
    team_number: req.params.teamNumber
  } })
    .then(cycles => res.json(formatCycles(cycles)))
}

module.exports = {
  getCycles,
  getCyclesByTeam,
  getCyclesByEvent,
  getCyclesByEventTeam
}
