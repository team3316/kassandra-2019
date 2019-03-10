/**
 * In this file the database connection and its models are defined
 */
const Sequelize = require('sequelize')
require('colors')

/**
 * Connecting to the database
 * If DATABASE_URL exists, use it
 * If not, use other config variables
 */
const defaultSequelizeArgs = {
  define: {
    timestamps: false,
    freezeTableName: true
  }
}

const sequelizeArgs = process.env.DATABASE_URL === '' || process.env.DATABASE_URL == null
  ? [
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    Object.assign({}, {
      dialect: process.env.DB_DIALECT,
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      define: {
        timestamps: false,
        freezeTableName: true,
        schema: process.env.DB_SCHEMA
      }
    })
  ]
  : [process.env.DATABASE_URL, defaultSequelizeArgs]

const sequelize = new Sequelize(...sequelizeArgs)

/** Creating models */
const Cycle = sequelize.define('cycles', {
  /**
   * The match id consists of the event, the match and the set number
   * @type {String}
   */
  match_key: {
    type: Sequelize.STRING,
    allowNull: false
  },
  team_number: {
    type: Sequelize.INTEGER,
    allowNull: false
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
   * Sandstorm
   */
  sandstorm_hab_line: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
    allowNull: false
  },
  sandstorm_cargo_to_cargo_ship: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
    allowNull: false
  },
  sandstorm_cargo_to_rocket: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
    allowNull: false
  },
  sandstorm_panel_to_cargo_ship: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
    allowNull: false
  },
  sandstorm_panel_to_rocket: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
    allowNull: false
  },

  /**
   * Teleop
   */
  teleop_panels_to_cargo_ship: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    allowNull: false
  },
  teleop_cargo_to_cargo_ship: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    allowNull: false
  },
  teleop_cargo_to_level1: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    allowNull: false
  },
  teleop_cargo_to_level2: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    allowNull: false
  },
  teleop_cargo_to_level3: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    allowNull: false
  },
  teleop_panels_to_level1: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    allowNull: false
  },
  teleop_panels_to_level2: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    allowNull: false
  },
  teleop_panels_to_level3: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    allowNull: false
  },

  /**
   * Climb level
   */
  climb: {
    type: Sequelize.ENUM,
    values: ['nothing', 'failed', 'level1', 'level2', 'level3'],
    defaultValue: 'nothing',
    allowNull: false
  },

  /**
   * Defence
   *
   * defence_state: determines whether the robot was defending, was offended or nothing
   * defence_comment: the comment the scouter left about the teams defence abilities
   * offender: the team that performed the defence
   */
  defence_state: {
    type: Sequelize.ENUM,
    values: ['non', 'defended', 'offended'],
    defaultValue: 'non',
    allowNull: false
  },
  defence_comment: {
    type: Sequelize.STRING
  },
  offender: {
    type: Sequelize.INTEGER
  },

  /**
   * Miscellaneous
   */
  comment: {
    type: Sequelize.TEXT
  },
  tech_fouls: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
    allowNull: false
  }
})

/** Module exports */
module.exports = {
  Cycle,
  sequelize
}
