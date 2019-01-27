const { Router } = require('express')

const router = new Router()

const {
  views,
  getCyclesByEvent,
  getCyclesByTeam,
  getCyclesByEventTeam,
  addCycle,
  toggleCycleVisibility,
  getStats,
  getRankings
} = require('./routes/index')

/**
 * Add cycle
 */
router.post('/cycles', addCycle)

/**
 * Get cycles
 */
router.get('/cycles/event/:eventKey', getCyclesByEvent)
router.get('/cycles/team/:teamNumber', getCyclesByTeam)
router.get('/cycles/event/:eventKey/team/:teamNumber', getCyclesByEventTeam)

/**
 * Toggle cycle visibility
 */
router.put('/cycles/visibility', toggleCycleVisibility)

/**
 * Get statistics for team
 */
router.get('/stats/:teamNumber', getStats)

/**
 * Get rankings for specific event
 */
router.get('/rankings/:eventKey', getRankings)

/**
 * Views
 */
router.get('/*', views)

module.exports = router
