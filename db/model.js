const Sequelize = require('sequelize')
const schema = 'demo'
const user = 'root'
const password = 'password'
// Connecting to the database
const connection = new Sequelize(schema, user, password, {
  host: 'localhost',
  dialect: 'postgres'
})
// Defining tables
const Team = connection.define('teams', {
  team_number: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false
  }
}, { timestamps: false })

const Event = connection.define('events', {
  event_name: {
    type: Sequelize.STRING,
    primaryKey: true,
    allowNull: false
  }
}, { timestamps: false })

const Match = connection.define('matches', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false
  },
  match_type: {
    type: Sequelize.ENUM,
    values: ['QM', 'QF', 'SF', 'F'],
    allowNull: false
  },
  match_id: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  match_number: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  event: {
    type: Sequelize.STRING,
    allowNull: false,
    references: {
      model: 'events',
      key: 'event_name'
    }
  }
}, { timestamps: false })

const EventTeam = connection.define('events_teams', {
  team: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'teams',
      key: 'team_number'
    }
  },

  event: {
    type: Sequelize.STRING
  }
})

const Cycle = connection.define('cycles', {

})
// Module exports
module.exports = {
  Event,
  Team,
  Match,
  connection
}
