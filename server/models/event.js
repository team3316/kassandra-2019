const {
  sequelize,
  Sequelize
} = require('./index')

const Event = sequelize.define('events', {
  event_name: {
    type: Sequelize.STRING,
    primaryKey: true,
    allowNull: false
  }
}, { timestamps: false })

module.exports = Event
