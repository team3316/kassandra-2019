const { Router } = require('express')

const router = new Router()

const {
  addTeam,
  homePage,
  addEvent
} = require('./routes')

router.get('/*', homePage)

router.post('/team', addTeam)

router.post('/event', addEvent)

module.exports = router
