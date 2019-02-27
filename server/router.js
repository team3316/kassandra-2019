const { Router } = require('express')

const router = new Router()

const {
  views,
  getCyclesByEvent,
  getCyclesByTeam,
  getCyclesByEventTeam,
  addCycle,
  toggleCycleVisibility,
  getCycles
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
 * Get all records from the database
 */

/**
 * Views
 */
router.get('/*', views)

module.exports = router
