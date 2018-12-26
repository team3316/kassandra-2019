const { Router } = require('express')
const { join } = require('path')

const router = new Router()

const {
  addTeam,
  addTeamPost,
  homePage
} = require('./routes')

router.get('/form', (req, res, next) => {
  res.sendFile(join(process.cwd(), 'public', 'form.html'))
})

router.get('/done', (req, res, next) => {
  res.sendFile(join(__dirname, '../../public/done.html'))
})

router.post('/form2', (req, res, next) => {
  console.log(req.body)
  res.redirect('/done')
})

router.get('/test', (req, res, next) => {
  res.send('Request handled')
  console.log('Request handled')
})

router.get('/team/:team', addTeam)

router.get('/', homePage)

module.exports = router
