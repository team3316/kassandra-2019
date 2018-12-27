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
  console.log(req.body.teamNumber)
  Team.findOrCreate({ where: { team_number: Number(req.body.teamNumber) } })
}

const homePage = (req, res, next) => {
  res.sendFile(join(process.cwd(), 'public', 'index.html'))
}

module.exports = {
  addTeam,
  homePage
}
