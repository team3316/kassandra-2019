const { Router } = require('express')

const router = new Router()

const {
  views,
  tests,
  getCyclesByEvent,
  getCyclesByTeam,
  getCyclesByEventTeam,
  addCycle,
  toggleCycleVisibility,
  getCycles,
  getEvents,
  getTeamsByEvent,
  getRankings
} = require('./routes/index')

/**
 * Add cycle
 */
router.post('/cycles', addCycle)

/**
 * Get cycles
 */
router.get('/cycles', getCycles)
router.get('/cycles/event/:eventKey', getCyclesByEvent)
router.get('/cycles/team/:teamNumber', getCyclesByTeam)
router.get('/cycles/event/:eventKey/team/:teamNumber', getCyclesByEventTeam)

/**
 * Toggle cycle visibility
 */
router.put('/cycles/visibility', toggleCycleVisibility)

/**
 * Get rankings
 */
router.get('/rankings/:orderedBy', getRankings)

/**
 * Get events
 */
router.get('/events', getEvents)

/**
 * Get teamas
 */
router.get('/teams/event/:eventKey', getTeamsByEvent)

/**
 * Tests
 */
router.get('/tests', tests)

/**
 * Views
 */
router.get('/*', views)

module.exports = router
