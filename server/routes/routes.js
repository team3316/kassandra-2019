const {
  Team,
  Event,
  EventTeam,
  Match,
  Cycle
} = require('../models/models')
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

module.exports = {
  addTeam,
  addTeamPost
}
