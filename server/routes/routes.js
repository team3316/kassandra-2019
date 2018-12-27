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

const addTeam = (req, res, next) => {
  Team.findOrCreate({ where: { team_number: Number(req.body.teamNumber) } })
}

const homePage = (req, res, next) => {
  res.sendFile(join(process.cwd(), 'public', 'index.html'))
}

const addEvent = (req, res, next) => {
  Event.findOrCreate({ where: { event_name: req.body.eventName } })
}

const matchList = (req, res, next) => {
  res.sendFile(join(process.cwd(), 'public', 'views', 'matchlist.html'))
}

module.exports = {
  addTeam,
  homePage,
  addEvent,
  matchList
}
