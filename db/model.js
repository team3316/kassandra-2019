const Sequelize = require('sequelize')
const schema = 'test'
const user = 'root'
const password = 'password'
// Connecting to the database
const db = new Sequelize(schema, user, password, {
  host:'localhost',
  dialect: 'mysql'
})
// Checking the connection
db.authenticate()
  .then(() => {
    console.log('Connection established')
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err)
  })
// Defining tables
const Teams = db.define('teams', {
  team_number: {
    type: Sequelize.INT,
    primaryKey: true,
    allowNull: false
  }
}, {timestemps: false})

const Events = db.define('events', {
  event_name: {
    type: Sequelize.STRING,
    primaryKey: true,
    allowNull: false
  }
}, {timestemps: false})

module.exports{
  Events,
  Teams,
  db
}

