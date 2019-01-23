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
  Cycle.findAll()
}

const getCyclesByTeam = (req, res) => {
  res.send()
}

const getCycleByEventTeam = (req, res) => {

}

const getTeams = (req, res) => {
  Team.findAll().then(teams => {
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
  views
}
