/**
 * Adds cycles to the database
 *
 * Request body format at new-cycle.json
 */
const colors = require('colors')
const { Cycle } = require('../db')

module.exports = (req, res) => {
  Cycle.create({
    match_id: req.body.matchId,
    team_number: req.body.teamNumber
  })

  console.log(
    '==> ' + 'Request Body:'.green.bold + '\n' +
    JSON.stringify(req.body, null, 2).yellow + '\n' +
    '==> ' + 'Delete this logging'.red.bold
  )
}
