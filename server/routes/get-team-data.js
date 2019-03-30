const { sequelize } = require('../db')

const getTeamDataByEvent = ({ params }, res) => sequelize.query(
  `SELECT match_key AS "matchKey",
  teleop_cargo_to_cargo_ship + teleop_cargo_to_level1 +
  CASE sandstorm_cargo_to_cargo_ship
    WHEN 'true' THEN 1
    WHEN 'false' THEN 0
  END AS "lowCargo",
  teleop_cargo_to_level2 + teleop_cargo_to_level3 +
  CASE sandstorm_cargo_to_rocket
    WHEN 'true' THEN 1
    WHEN 'false' THEN 0
  END AS "highCargo",

  teleop_panels_to_cargo_ship + teleop_panels_to_level1 +
  CASE sandstorm_panel_to_cargo_ship
    WHEN 'true' THEN 1
    WHEN 'false' THEN 0
  END AS "lowPanels",
  teleop_panels_to_level2 + teleop_panels_to_level3 +
  CASE sandstorm_panel_to_rocket
    WHEN 'true' THEN 1
    WHEN 'false' THEN 0
  END AS "highPanels",

  sandstorm_cargo_to_cargo_ship, sandstorm_cargo_to_rocket,
  sandstorm_panel_to_cargo_ship, sandstorm_panel_to_rocket,

  defence_state AS "defenceState"

  FROM ${process.env.DB_SCHEMA != null ? `${process.env.DB_SCHEMA}.` : ''}cycles
  WHERE team_number = ${params.teamNumber} AND match_key ~ '${params.eventKey}'
  AND visible = true;`
).then(data => res.json(data[0]))

module.exports = {
  getTeamDataByEvent
}
