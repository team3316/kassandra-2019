const Sequelize = require('sequelize')
const database = 'postgres'
const user = 'postgres'
const password = 'password'
// Connecting to the database
const db = new Sequelize(database, user, password, {
  dialect: 'postgres',
  host: 'localhost',
  port: 5432
})
// Table definitions
const Team = db.define('teams', {
  team_number: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false
  }
}, { timestamps: false })

const Event = db.define('events', {
  event_name: {
    type: Sequelize.STRING,
    primaryKey: true,
    allowNull: false
  }
}, { timestamps: false })

const Match = db.define('matches', {
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

const EventTeam = db.define('events_teams', {
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

const Cycle = db.define('cycles', {
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

const Autonomous = db.define('autonomous', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  }
}, { timestamps: false })

const Teleop = db.define('teleop', {
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

const EndGame = db.define('end_game', {
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
  db
}
