/**
 * @todo Write docs for the routes
 */

const {
  Team,
  Event,
  EventTeam,
  Match,
  Cycle
} = require('../models/models')

const { Op } = require('sequelize')
const { join } = require('path')

/**
 * Adds cycles to the database
 */
const addCycle = (req, res) => {
  Team.findOrCreate({ where: { team_number: Number(req.body.teamNumber) } })

  Event.findOrCreate({ where: { event_key: req.body.eventKey } })

  EventTeam.findOrCreate({
    where: {
      team_number: req.body.team,
      event_key: req.body.eventKey
    }
  })

  Match.findOrCreate({ where: { id: req.body.matchId } })

  Cycle.create({
    match_id: req.body.matchId,
    team_number: req.body.teamNumber
  })
}

/**
 * Gets cycles/cycle from the database depending on the parameters
 */
const getCyclesByEvent = (req, res) => {
  Cycle.findAll({ where:
    { match_id: { [Op.regex]: req.params.eventKey } }
  })
    .then(cycles => res.send(cycles))
}

const getCyclesByTeam = (req, res) => {
  Cycle.findAll({ where: { team_number: req.body.team_number } })
    .then(cycles => {
      res.send(cycles)
    })
}

const getCycleByEventTeam = (req, res) => {
  Cycle.findAll({ where: {
    match_id: { [Op.regex]: req.params.eventKey },
    team_number: req.params.teamNumber
  } })
    .then(cycles => res.send(cycles))
}

/**
 * Toggles the selected cycle visibility in the statistics
 */
const toggleCycleVisibility = (req, res) => {

}

const getTeams = (req, res) => {
  Team.findAll()
    .then(teams => {
      res.send(teams.map(team => team.team_number))
    })
}

const getTeamsByEvent = (req, res) => {
  EventTeam.findAll({ where: { event_key: req.params.eventKey } })
    .then(teams => {
      res.send(teams.map(team => team.team_number))
    })
}

/**
 * Directs to all views
 */
const views = (req, res) => {
  res.sendFile(join(process.cwd(), 'public', 'index.html'))
}

module.exports = {
  getCyclesByEvent,
  getCyclesByTeam,
  getCycleByEventTeam,
  addCycle,
  getTeams,
  getTeamsByEvent,
  toggleCycleVisibility,
  views
}
