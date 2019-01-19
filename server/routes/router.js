const { Router } = require('express')

const router = new Router()

const {
  addTeam,
  homePage,
  addEvent,
  addCycle
} = require('./routes')

router.post('/api/cycle', addCycle)
router.post('/api/event', addEvent)
router.post('/api/team', addTeam)

router.get('/*', homePage)

module.exports = router
