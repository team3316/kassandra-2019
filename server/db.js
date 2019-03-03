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
const sequelize = process.env.DATABASE_URL === '' || process.env.DATABASE_URL == null
  ? new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
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
  : new Sequelize(process.env.DATABASE_URL)

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
   * Miscellaneous
   */
  comment: {
    type: Sequelize.STRING
  },
  tech_fouls: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
    allowNull: false
  }
})

console.log(`==> ${'DELETE DATABASE INSERTIONS ON STARTUP'.red.bold}`)

for (let i = 1; i <= 15; i++) {
  Cycle.create({
    match_key: `2019test_qm${i}`,
    team_number: 3316,

    sandstorm_hab_line: true,
    sandstorm_cargo_to_cargo_ship: i % 2 === 0,
    sandstorm_cargo_to_rocket: i % 2 !== 0,
    sandstorm_panel_to_cargo_ship: i % 2 !== 0,
    sandstorm_panel_to_rocket: i % 2 === 0,

    teleop_cargo_to_cargo_ship: Math.round(Math.random() * 4),
    teleop_cargo_to_level1: Math.round(Math.random() * 2),
    teleop_cargo_to_level2: Math.round(Math.random() * 2),
    teleop_cargo_to_level3: Math.round(Math.random() * 2),
    teleop_panels_to_cargo_ship: Math.round(Math.random() * 4),
    teleop_panels_to_level1: Math.round(Math.random() * 2),
    teleop_panels_to_level2: Math.round(Math.random() * 2),
    teleop_panels_to_level3: Math.round(Math.random() * 2),

    climb: 'level3',
    comment: `gay ${i}`,
    tech_fouls: i % 2 === 0
  })
}

/** Module exports */
module.exports = {
  Cycle,
  sequelize
}
