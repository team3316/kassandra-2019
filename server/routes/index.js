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
const getEvents = require('./get-events')
const { getTeamsByEvent } = require('./get-teams')
const { getTeamDataByEvent } = require('./get-team-data')
const getAverage = require('./get-average')

/**
 * Directs to all views
 */
const views = (req, res) => {
  res.sendFile(join(process.cwd(), 'public', 'index.html'))
}

/**
 * Directs to HTML file testing
 */
const tests = (req, res) => {
  res.sendFile(join(process.cwd(), 'tests', 'tests.html'))
}

module.exports = {
  getCyclesByEvent,
  getCyclesByTeam,
  getCyclesByEventTeam,
  addCycle,
  toggleCycleVisibility,
  getCycles,
  getRankings,
  getEvents,
  getTeamsByEvent,
  getTeamDataByEvent,
  getAverage,
  tests,
  views
}
