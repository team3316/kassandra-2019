const {
  sequelize,
  Sequelize
} = require('./index')

const Team = sequelize.define('teams', {
  team_number: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false
  }
}, { timestamps: false })

module.exports = Team
