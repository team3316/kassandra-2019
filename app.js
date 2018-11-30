const express = require('express')
const path = require('path')

const app = express()
const port = 3000

const {
  connection,
  Team,
  Match,
  Event
} = require('./db/model.js')

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => res.send('Kassandra'))

app.listen(port, () => console.log(`Kassandra listening on port ${port}!`))

connection.authenticate()
  .then(() => {
    console.log('Connection established')
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err)
  })

connection.sync().then(() => {
  Team.findOrCreate({ where: {
    team_number: 3316
  }})
}).catch(err => console.error(err)) 