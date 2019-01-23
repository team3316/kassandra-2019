/**
 * In this file the database connection and its models are defined
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

const integer = {
  type: Sequelize.INTEGER,
  defaultValue: 0,
  allowNull: false
}

/**
 * Table definitions
 *
 * teams table in the database
 */
const Team = sequelize.define('teams', {
  team_number: {
    ...integer,
    primaryKey: true
  }
})

const Event = sequelize.define('events', {
  event_key: {
    type: Sequelize.STRING,
    primaryKey: true,
    allowNull: false
  }
})
/**
 * matches table in the database
 */
const Match = sequelize.define('matches', {
  match_id: {
    type: Sequelize.STRING,
    primaryKey: true,
    allowNull: false
  }
})

Match.belongsTo(Event, { foreignKey: {
  name: 'event_key',
  type: Sequelize.STRING,
  allowNull: false
} })

/**
 * events_teams table in the database
 * A linking table between matches and teams
 */
const EventTeam = sequelize.define('events_teams')

EventTeam.belongsTo(Team, { foreignKey: {
  name: 'team_number',
  type: Sequelize.INTEGER,
  defaultValue: 0,
  allowNull: false
} })
EventTeam.belongsTo(Event, { foreignKey: {
  name: 'event_key',
  type: Sequelize.STRING,
  allowNull: false
} })

EventTeam.removeAttribute('id')

/**
 * cycles table in the database
 * @type {}
 */
const Cycle = sequelize.define('cycles', {
  id: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true
  },

  /**
   * Whether or not the record should appear in statistics
   * @type {Boolean}
   */
  visible: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
    allowNull: false
  },

  /**
   * Collections
   * Where can the robot collect from
   * @type {Boolean}
   */
  collection_cargo_from_floor: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
    allowNull: false
  },
  collection_cargo_from_human_player: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
    allowNull: false
  },
  collection_panels_from_floor: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
    allowNull: false
  },
  collection_panels_from_human_player: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
    allowNull: false
  },
  collection_in_frame_perimeter: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
    allowNull: false
  },

  /**
   * Sandstorm
   */
  sandstorm_control_method: {
    type: Sequelize.ENUM,
    values: ['nothing', 'drivers', 'autonomous'],
    defaultValue: 'nothing',
    allowNull: false
  },
  sandstorm_panels_cargo_ship: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    allowNull: false
  },
  sandstorm_cargo_cargo_ship: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    allowNull: false
  },
  sandstorm_panels_level1: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    allowNull: false
  },
  sandstorm_panels_level2: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    allowNull: false
  },
  sandstorm_panels_level3: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    allowNull: false
  },
  sandstorm_cargo_level1: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    allowNull: false
  },
  sandstorm_cargo_level2: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    allowNull: false
  },
  sandstorm_cargo_level3: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    allowNull: false
  },
  level2_drop: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
    allowNull: false
  },

  /**
   * Teleop
   * If the value is -1, show they can't do it
   */
  teleop_panels_cargo_ship: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    allowNull: false
  },
  teleop_cargo_cargo_ship: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    allowNull: false
  },
  teleop_panels_level1: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    allowNull: false
  },
  teleop_panels_level2: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    allowNull: false
  },
  teleop_panels_level3: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    allowNull: false
  },
  teleop_cargo_level1: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    allowNull: false
  },
  teleop_cargo_level2: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    allowNull: false
  },
  teleop_cargo_level3: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    allowNull: false
  },

  /**
   * Endgame
   */
  climb_level: {
    type: Sequelize.ENUM,
    values: ['Level 1', 'Level 2', 'Level 3'],
    defaultValue: 'Level 1',
    allowNull: false
  },

  /**
   * Miscellaneous
   */
  comments: {
    type: Sequelize.STRING
  },
  tech_fouls: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
    allowNull: false
  }
}, {
  getterMethods: {
    amount: () => this.findAndCountAll({
      where: {
        match_id: this.match_id,
        team_number: this.team_number
      }
    })
  },
  hooks: {
    beforeCreate: cycle => {
      cycle.set('id', cycle.match_id + '_' + cycle.team_number + '_' + (this.amount + 1))
    }
  }
})

Cycle.belongsTo(Match, { foreignKey: {
  name: 'match_id',
  type: Sequelize.STRING,
  allowNull: false
} })
Cycle.belongsTo(Team, { foreignKey: {
  name: 'team_number',
  type: Sequelize.INTEGER,
  allowNull: false
} })

// Module exports
module.exports = {
  Event,
  Team,
  Match,
  EventTeam,
  Cycle,
  sequelize
}
