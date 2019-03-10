/**
 * In this file the main Express app is being initiated
 */
const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const path = require('path')
const router = require('./server/router')
/** Node.js logging with stylings */
require('colors')

const app = express()
const { sequelize } = require('./server/db')

/**
* Parsing HTTP requests
*/
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

/**
 * Serving static files and routing
 */
app.use('/tests/', express.static(path.join(__dirname, 'tests')))
app.use(express.static(path.join(__dirname, 'public')))
app.use('/', router)

/**
 * If the enviornment isn't production, use morgan http request logger
 */
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'))
}

/** Adding models to the database */
sequelize.sync()
  .then(() => {
    console.log('==> ' + 'Added models to the database'.blue.bold)
  })
  .catch(err => {
    console.error('==> ' + 'Unable to add models to the database:'.red.bold, err)
  })

/** Module exports */
module.exports = app
