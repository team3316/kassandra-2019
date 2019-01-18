const { Router } = require('express')

const router = new Router()

const {
  addTeam,
  homePage,
  addEvent,
  addCycle
} = require('./routes')

router.get('/*', homePage)

router.post('/team', addTeam)

router.post('/api/event', addEvent)

router.post('/api/cycle', addCycle)

module.exports = router
