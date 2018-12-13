const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')
const path = require('path')

const app = express()

const {
  sequelize
} = require('./server/models/models.js')

app.use(express.static(path.join(__dirname, 'public')))
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (req, res) => res.send('Kassandra'))

sequelize.authenticate()
  .then(() => {
    console.log('')
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err)
  })

sequelize.sync().then(() => {
  Team.findOrCreate({ where: {
    team_number: 3316
  } })
}).catch(err => console.error(err))

module.exports = app
