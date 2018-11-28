const express = require('express')
const path = require('path')
const Sequelize = require('sequelize')

const app = express()
const port = 3000
const connection = new Sequelize('kassandra', 'root', 'password', {
  host:'localhost',
  dialect: 'mysql'
})

connection
  .authenticate()
  .then(() => {
    console.log('Connection established')
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err)
  })

const Data = connection.define('team', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  
  match: Sequelize.STRING,
  team: Sequelize.INTEGER,

})

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => res.send('Kassandra'))

app.listen(port, () => console.log(`Kassandra listening on port ${port}!`))