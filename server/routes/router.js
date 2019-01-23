const { Router } = require('express')

const router = new Router()

const {
  views,
  getCyclesByEvent,
  getCyclesByTeam,
  getCycleByEventTeam,
  addCycle,
  getTeams
} = require('./routes')

/**
 * Add cycle
 */
router.post('/cycles', addCycle)

/**
 * Get teams
 */
router.get('/teams', getTeams)

/**
 * Get cycles
 */
router.get('/cycles/event/:eventKey', getCyclesByEvent)
router.get('/cycles/team/:teamNumber/view=all', getCyclesByTeam)
router.get('/cycles/event/:eventKey/team/:teamNumber', getCycleByEventTeam)

/**
 * Views
 */
router.get('/*', views)

module.exports = router
