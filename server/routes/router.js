const { Router } = require('express')

const router = new Router()

const {
  views,
  getCyclesByEvent,
  getCyclesByTeam,
  getCycleByEventTeam,
  addCycle,
  toggleCycleVisibility,
  getTeams,
  getTeamsByEvent
} = require('./routes')

/**
 * Add cycle
 */
router.post('/cycles', addCycle)

/**
 * Get cycles
 */
router.get('/cycles/event/:eventKey', getCyclesByEvent)
router.get('/cycles/team/:teamNumber', getCyclesByTeam)
router.get('/cycles/event/:eventKey/team/:teamNumber', getCycleByEventTeam)

/**
 * Toggle cycle visibility
 */
router.put('/cycles', toggleCycleVisibility)

/**
 * Get teams
 */
router.get('/teams', getTeams)
router.get('/teams/event/:eventKey/', getTeamsByEvent)

/**
 * Views
 */
router.get('/*', views)

module.exports = router
