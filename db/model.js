const Sequelize = require('sequelize')
const schema = 'demo'
const user = 'root'
const password = 'password'
// Connecting to the database
const connection = new Sequelize(schema, user, password, {
  host:'localhost',
  dialect: 'mysql'
})
// Defining tables
const Teams = connection.define('teams', {
  team_number: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false
  }
}, { timestemps: false })

const Events = connection.define('events', {
  event_name: {
    type: Sequelize.STRING,
    primaryKey: true,
    allowNull: false
  }
}, { timestemps: false }) 

module.exports = {
  Events,
  Teams,
  connection
}

