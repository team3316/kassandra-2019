/**
 * In this file the database connection and its models are defined
 * @todo Create a seperate config file for the connection arguments
 */
const Sequelize = require('sequelize')
/** Connecting to the database */
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  dialect: process.env.DB_DIALECT,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,

  /** Default table definition options */
  define: {
    timestamps: false,
    freezeTableName: true,
    schema: process.env.DB_SCHEMA
  }
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
})

const Event = sequelize.define('events', {
  event_name: {
    type: Sequelize.STRING,
    primaryKey: true,
    allowNull: false
  }
})
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
})
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
})

const Autonomous = sequelize.define('autonomous', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  }
})

const Teleop = sequelize.define('teleop', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  }
})

const EndGame = sequelize.define('end_game', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  }
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
