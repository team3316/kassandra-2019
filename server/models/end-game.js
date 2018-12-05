const {
  sequelize,
  Sequelize
} = require('./index')

const EndGame = sequelize.define('end_game', {
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

module.exports = EndGame
