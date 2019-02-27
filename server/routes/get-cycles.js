/**
 * Cycle getters
 */
const { Op } = require('sequelize')
const { Cycle } = require('../db')

/**
 * Get all cycles in the database
 */
const getCycles = (req, res) =>
  Cycle.findAll().then(cycles => res.json(cycles))

/**
 * Gets eventKey as a url parameter
 * Returns the cycles in the event
 */
const getCyclesByEvent = (req, res) => {
  Cycle.findAll({ where:
    { match_id: { [Op.regex]: req.params.eventKey } }
  })
    .then(cycles => res.json(cycles))
}

/**
 * Gets teamNumber as a url parameter
 * Returns the cycles the team has
 */
const getCyclesByTeam = (req, res) => {
  Cycle.findAll({ where: { team_number: req.body.team_number } })
    .then(cycles => res.json(cycles))
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
    .then(cycles => res.json(cycles))
}

module.exports = {
  getCycles,
  getCyclesByTeam,
  getCyclesByEvent,
  getCyclesByEventTeam
}
