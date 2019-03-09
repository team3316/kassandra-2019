/**
 * @todo Write docs for the routes
 */
const { join } = require('path')
const addCycle = require('./add-cycle')
const {
  getCycles,
  getCyclesByEvent,
  getCyclesByEventTeam,
  getCyclesByTeam
} = require('./get-cycles')
const toggleCycleVisibility = require('./toggle-cycle-visibility')
const getRankings = require('./get-rankings')

/**
 * Directs to all views
 */
const views = (req, res) => {
  res.sendFile(join(process.cwd(), 'public', 'index.html'))
}

module.exports = {
  getCyclesByEvent,
  getCyclesByTeam,
  getCyclesByEventTeam,
  addCycle,
  toggleCycleVisibility,
  getCycles,
  getRankings,
  views
}
