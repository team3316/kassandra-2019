const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')
const path = require('path')

const app = express()

const {
  db,
  Team,
  Match,
  Event
} = require('./db/models.js')

app.use(express.static(path.join(__dirname, 'public')))
app.use(logger('dev'))

app.get('/', (req, res) => res.send('Kassandra'))

db.authenticate()
  .then(() => {
    console.log('')
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err)
  })

db.sync().then(() => {
  Team.findOrCreate({ where: {
    team_number: 3316
  } })
}).catch(err => console.error(err))

module.exports = app
