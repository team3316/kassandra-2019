const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')
const path = require('path')
const index = require('./server/routes/router')
const colors = require('colors')

const app = express()
const { sequelize } = require('./server/models/models.js')

/** Middleware usage */
app.use(express.static(path.join(__dirname, 'public')))
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/', index)

/** Adding models to the database */
sequelize.sync()
  .then(() => {
    console.log('==> ' + 'Added models to the database'.blue.bold)
  })
  .catch(err => {
    console.error('Unable to add models to the database:'.red, err)
  })

/** Module exports */
module.exports = app
