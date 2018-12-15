const {
  Team,
  Event,
  EventTeam,
  Match,
  Cycle
} = require('../models/models')

const { join } = require('path')
/*
* Adds team from url to database
*/
const addTeam = (req, res, next) => {
  // Team.findOrCreate({ where: { team_number: req.params.team } })
  res.send(req.params.team)
}

const addTeamPost = (req, res, next) => {
  res.send()
}

const homePage = (req, res, next) => {
  res.sendFile(join(__dirname, '../../public/index.html'))
}

module.exports = {
  addTeam,
  addTeamPost,
  homePage
}
