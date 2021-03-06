const { sequelize } = require('../db')

const climb = event => `SELECT team_number AS "teamNumber", COUNT(visible = true) AS "numberOfMatches",
AVG(CASE climb
  WHEN 'nothing' THEN 0
  WHEN 'failed' THEN 0
  WHEN 'level1' THEN 3
  WHEN 'level2' THEN 6
  WHEN 'level3' THEN 12
END) as climb
FROM ${process.env.DB_SCHEMA != null ? `${process.env.DB_SCHEMA}.` : ''}cycles
WHERE visible = true AND match_key ~ '${event}'
GROUP BY team_number
ORDER BY AVG(CASE climb
  WHEN 'nothing' THEN 0
  WHEN 'failed' THEN 0
  WHEN 'level1' THEN 3
  WHEN 'level2' THEN 6
  WHEN 'level3' THEN 12
END) DESC;`

const cargo = event => `SELECT team_number AS "teamNumber", COUNT(visible = true) AS "numberOfMatches",
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
FROM ${process.env.DB_SCHEMA != null ? `${process.env.DB_SCHEMA}.` : ''}cycles
WHERE visible = true ${
  /**
   * If NODE_ENV === 'production count from ISDE2 QM28'
   * This was done to fix a bug with the cargo to cargo ship data in averages
   */
  process.env.NODE_ENV === 'production' ? 'AND id > 178 ' : ''
} AND match_key ~ '${event}'
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

const panels = event => `SELECT team_number AS "teamNumber", COUNT(visible = true) AS "numberOfMatches",
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
FROM ${process.env.DB_SCHEMA != null ? `${process.env.DB_SCHEMA}.` : ''}cycles
WHERE visible = true AND match_key ~ '${event}'
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

const stats = event => `SELECT team_number, COUNT(visible = true) AS number_of_matches,
AVG(teleop_cargo_to_cargo_ship + teleop_cargo_to_level1 + teleop_cargo_to_level2 + teleop_cargo_to_level3 +
  CASE sandstorm_cargo_to_rocket
    WHEN 'true' THEN 1
    WHEN 'false' THEN 0
  END +
  CASE sandstorm_cargo_to_cargo_ship
    WHEN 'true' THEN 1
    WHEN 'false' THEN 0
  END
) as average_cargo_per_game,
AVG(teleop_panels_to_cargo_ship + teleop_panels_to_level1 + teleop_panels_to_level2 + teleop_panels_to_level3 +
  CASE sandstorm_panel_to_rocket
    WHEN 'true' THEN 1
    WHEN 'false' THEN 0
  END +
  CASE sandstorm_panel_to_cargo_ship
    WHEN 'true' THEN 1
    WHEN 'false' THEN 0
  END
) as average_panels_per_game,
/* Climb */
AVG(CASE climb
  WHEN 'nothing' THEN 0
  WHEN 'failed' THEN 0
  WHEN 'level1' THEN 3
  WHEN 'level2' THEN 6
  WHEN 'level3' THEN 12
END) as climb_score_average
FROM ${process.env.DB_SCHEMA != null ? `${process.env.DB_SCHEMA}.` : ''}cycles
WHERE visible = true AND match_key ~ '${event}'
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

/**
 * Contains every option for gettings rankings from the server
 * @type {Object}
 */
const queries = {
  climb,
  panels,
  cargo,
  stats
}

/**
 * The function gets the parameter to sort by and performs the matching query
 * @param  {String} params.orderedBy The game object to sort by
 * @param  {String} params.eventKey  The event to filter from
 */
module.exports = ({ params }, res) => {
  sequelize.query(queries[params.orderedBy](params.eventKey)).spread((data, metadata) => res.json(data))
}
