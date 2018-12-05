const {
  sequelize,
  Sequelize
} = require('./index')

const Teleop = sequelize.define('teleop', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  }
}, {
  timestamps: false,
  freezeTableName: true
})

module.exports = Teleop
