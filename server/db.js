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

/** Importing models */
const Cycle = sequelize.define('cycles', {
  /**
   * The match id consists of the event, the match and the set number
   * @type {String}
   */
  match_id: {
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
  sandstorm_control_method: {
    type: Sequelize.ENUM,
    values: ['nothing', 'drivers', 'autonomous'],
    defaultValue: 'nothing',
    allowNull: false
  },
  sandstorm_cargo_ship_panels: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
    allowNull: false
  },
  sandstorm_cargo_ship_cargo: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
    allowNull: false
  },
  sandstorm_rocket_cargo: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
    allowNull: false
  },
  sandstorm_rocket_panels: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
    allowNull: false
  },
  sandstorm_hab_line: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
    allowNull: false
  },

  /**
   * Teleop
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
  climb: {
    type: Sequelize.ENUM('nothing', 'failed', 'lvl1', 'lvl2', 'lvl3'),
    defaultValue: 'nothing',
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
  setterMethods: {
    /**
     * Toggles visibility of the match
     */
    visible: () => this.getDataValue('visible').then(isVisible => this.setDataValue(!isVisible))
  }
})

/** Module exports */
module.exports = {
  Cycle,
  sequelize
}
