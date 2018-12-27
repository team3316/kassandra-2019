const { Router } = require('express')
const { join } = require('path')

const router = new Router()

const {
  addTeam,
  homePage
} = require('./routes')

router.get('/', homePage)

router.post('/team', addTeam)

module.exports = router
