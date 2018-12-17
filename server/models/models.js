/**
 * In this file the database connection and its models are defined
 * @todo Create a seperate config file for the connection arguments
 */
const Sequelize = require('sequelize')
const database = 'postgres'
const user = 'postgres'
const password = 'password'
/** Connecting to the database */
const sequelize = new Sequelize(database, user, password, {
  dialect: 'postgres',
  host: 'localhost',
  port: 5432
})
/**
 * Table definitions
 *
 * teams table in the database
 */
const Team = sequelize.define('teams', {
  team_number: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false
  }
}, { timestamps: false })

const Event = sequelize.define('events', {
  event_name: {
    type: Sequelize.STRING,
    primaryKey: true,
    allowNull: false
  }
}, { timestamps: false })
/**
 * matches table in the database
 */
const Match = sequelize.define('matches', {
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
}, {
  timestamps: false,
  getterMethods: {
    /**
     * @return {string} string with match name, for example QM4 DCMP or QF1M1 D2
     */
    match () {
      const matchType = this.getDataValue('match_type')
      const matchNumber = this.getDataValue('match_number')
      const matchId = this.getDataValue('match_id')
      const event = this.getDataValue('event')

      if (matchType === 'QM') {
        return 'QM' + matchId + ' ' + event
      } else {
        return matchType + matchId + 'M' + matchNumber + ' ' + event
      }
    }
  }
})
/**
 * events_teams table in the database
 * A linking table between matches and teams
 */
const EventTeam = sequelize.define('events_teams', {
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
/**
 * cycles table in the database
 * @type {[}
 */
const Cycle = sequelize.define('cycles', {
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

const Autonomous = sequelize.define('autonomous', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  }
}, { timestamps: false })

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
  sequelize
}
