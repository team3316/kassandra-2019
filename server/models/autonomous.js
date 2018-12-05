const {
  sequelize,
  Sequelize
} = require('./index')

const Autonomous = sequelize.define('autonomous', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  }
}, { timestamps: false })

module.exports = Autonomous
