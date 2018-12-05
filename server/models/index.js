const Sequelize = require('sequelize')
const database = 'postgres'
const user = 'postgres'
const password = 'password'
const db = {}

const sequelize = new Sequelize(database, user, password, {
  dialect: 'postgres',
  host: 'localhost',
  port: 5432
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
