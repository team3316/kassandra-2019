const Sequelize = require('sequelize')
const database = 'postgres'
// const schema = 'kassandra_dev'
const user = 'postgres'
const password = 'password'
// Connecting to the database
const connection = new Sequelize(database, user, password, {
  dialect: 'postgres',
  host: 'localhost',
  port: 5432
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
    allowNull: false,
    autoIncrement: true
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
    type: Sequelize.STRING,
    allowNull: false,
    references: {
      model: 'events',
      key: 'event_name'
    }
  }
}, { timestamps: false })

const Cycle = connection.define('cycles', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },

  team: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'teams',
      key: 'team_number'
    }
  },

  match: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'matches',
      key: 'id'
    }
  },

  autonomous: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'autonomous',
      key: 'id'
    }
  },

  teleop: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'teleop',
      key: 'id'
    }
  },

  end_game: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'end_game',
      key: 'id'
    }
  }
}, { timestamps: false })

const Autonomous = connection.define('autonomous', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  }
}, { timestamps: false })

const Teleop = connection.define('teleop', {
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

const EndGame = connection.define('end_game', {
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
// Module exports
module.exports = {
  Event,
  Team,
  Match,
  EventTeam,
  Cycle,
  Autonomous,
  Teleop,
  EndGame,
  connection
}
