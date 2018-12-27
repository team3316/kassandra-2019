const { Router } = require('express')
const { join } = require('path')

const router = new Router()

const {
  addTeam,
  homePage,
  addEvent,
  matchList
} = require('./routes')

router.get('/', homePage)

router.post('/team', addTeam)

router.post('/event', addEvent)

router.get('/matchlist', matchList)

module.exports = router
