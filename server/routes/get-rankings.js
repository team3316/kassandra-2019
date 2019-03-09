const { sequelize } = require('../db')

const climb = `SELECT team_number AS "teamNumber", COUNT(visible = true) AS "numberOfMatches",
AVG(CASE climb
  WHEN 'nothing' THEN 0
  WHEN 'failed' THEN 0
  WHEN 'level1' THEN 3
  WHEN 'level2' THEN 6
  WHEN 'level3' THEN 12
END) as climb
FROM cycles WHERE visible = true GROUP BY team_number
ORDER BY AVG(CASE climb
  WHEN 'nothing' THEN 0
  WHEN 'failed' THEN 0
  WHEN 'level1' THEN 3
  WHEN 'level2' THEN 6
  WHEN 'level3' THEN 12
END) DESC;`

const cargo = `SELECT team_number AS "teamNumber", COUNT(visible = true) AS "numberOfMatches",
AVG(teleop_cargo_to_cargo_ship + teleop_cargo_to_level1 + teleop_cargo_to_level2 + teleop_cargo_to_level3 +
  CASE sandstorm_cargo_to_rocket
    WHEN 'true' THEN 1
    WHEN 'false' THEN 0
  END +
  CASE sandstorm_cargo_to_cargo_ship
    WHEN 'true' THEN 1
    WHEN 'false' THEN 0
  END
) as "cargoPerGame"
FROM cycles WHERE visible = true ${
  /**
   * If NODE_ENV === 'production count from ISDE2 QM28'
   * This was done to fix a bug with the cargo to cargo ship data in averages
   */
  process.env.NODE_ENV === 'production' ? 'AND id > 178 ' : ''
}
GROUP BY team_number
ORDER BY
AVG(teleop_cargo_to_cargo_ship + teleop_cargo_to_level1 + teleop_cargo_to_level2 + teleop_cargo_to_level3 +
  CASE sandstorm_cargo_to_rocket
    WHEN 'true' THEN 1
    WHEN 'false' THEN 0
  END +
  CASE sandstorm_cargo_to_cargo_ship
    WHEN 'true' THEN 1
    WHEN 'false' THEN 0
  END
) DESC;`

const panels = `SELECT team_number AS "teamNumber", COUNT(visible = true) AS "numberOfMatches",
AVG(teleop_panels_to_cargo_ship + teleop_panels_to_level1 + teleop_panels_to_level2 + teleop_panels_to_level3 +
  CASE sandstorm_panel_to_rocket
    WHEN 'true' THEN 1
    WHEN 'false' THEN 0
  END +
  CASE sandstorm_panel_to_cargo_ship
    WHEN 'true' THEN 1
    WHEN 'false' THEN 0
  END
) as "panelsPerGame"
FROM kassandra.cycles
WHERE visible = true
GROUP BY team_number
ORDER BY
AVG(teleop_panels_to_cargo_ship + teleop_panels_to_level1 + teleop_panels_to_level2 + teleop_panels_to_level3 +
  CASE sandstorm_panel_to_rocket
    WHEN 'true' THEN 1
    WHEN 'false' THEN 0
  END +
  CASE sandstorm_panel_to_cargo_ship
    WHEN 'true' THEN 1
    WHEN 'false' THEN 0
  END
) DESC;`

const queries = {
  climb,
  panels,
  cargo
}

module.exports = ({ params }, res) => {
  sequelize.query(queries[params.orderedBy]).spread((data, metadata) => res.json(data))
}
