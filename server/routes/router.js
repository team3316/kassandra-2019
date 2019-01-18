const { Router } = require('express')

const router = new Router()

const {
  addTeam,
  homePage,
<<<<<<< HEAD
  addEvent
=======
  addEvent,
  addCycle
>>>>>>> match-list
} = require('./routes')

router.get('/*', homePage)

router.post('/team', addTeam)

<<<<<<< HEAD
router.post('/event', addEvent)
=======
router.post('/api/event', addEvent)

router.post('/api/cycle', addCycle)
>>>>>>> match-list

module.exports = router
