const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')
const path = require('path')
const index = require('./server/routes/router')

const app = express()
const { sequelize } = require('./server/models/models.js')

/** Middleware usage */
app.use(express.static(path.join(__dirname, 'public')))
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/', index)

/** Establishing connection to the database */
sequelize.authenticate()
  .then(() => {
    console.log('Connection established')
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err)
  })

/** Adding models to the database */
sequelize.sync()
  .then(() => {
    console.log('Added models to the database')
  })
  .catch(err => {
    console.error('Unable to add models to the database:', err)
  })

/** Module exports */
module.exports = app
