const { Router } = require('express')

const router = new Router()

const {
  addTeam,
  homePage,
<<<<<<< HEAD
<<<<<<< HEAD
  addEvent
=======
  addEvent,
  addCycle
>>>>>>> match-list
=======
  addEvent,
  addCycle
>>>>>>> 6ac2331a15fe73cfc5b2401659ad9bb7891da904
} = require('./routes')

router.get('/*', homePage)

router.post('/team', addTeam)

<<<<<<< HEAD
<<<<<<< HEAD
router.post('/event', addEvent)
=======
router.post('/api/event', addEvent)

router.post('/api/cycle', addCycle)
>>>>>>> match-list
=======
router.post('/api/event', addEvent)

router.post('/api/cycle', addCycle)
>>>>>>> 6ac2331a15fe73cfc5b2401659ad9bb7891da904

module.exports = router
