/*
  Counting how many visible matches are there on a team
  Shows cargo and panels per game averages
  Shows only visible matches
 */
SELECT team_number, COUNT(visible = true) AS number_of_matches,
/* Averaging game objects to specific columns */
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
  CASE sandstorm_panel_to_panel_ship
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
FROM cycles WHERE visible = true
GROUP BY team_number ORDER BY team_number ASC;

/*
  Panels, including sandstorm
 */
SELECT team_number, COUNT(visible = true) AS number_of_matches,
/* Averaging game objects to specific columns */
AVG(teleop_panels_to_cargo_ship + teleop_panels_to_level1 + teleop_panels_to_level2 + teleop_panels_to_level3 +
  CASE sandstorm_panel_to_rocket
    WHEN 'true' THEN 1
    WHEN 'false' THEN 0
  END +
  CASE sandstorm_panel_to_cargo_ship
    WHEN 'true' THEN 1
    WHEN 'false' THEN 0
  END
) as average_panels_per_game
FROM cycles WHERE visible = true AND match_key ~ '2019isde4'
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
) DESC;

/*
  Cargo, including sandstorm
 */
SELECT team_number, COUNT(visible = true) AS number_of_matches,
/* Averaging game objects to specific columns */
AVG(teleop_cargo_to_cargo_ship + teleop_cargo_to_level1 + teleop_cargo_to_level2 + teleop_cargo_to_level3 +
  CASE sandstorm_cargo_to_rocket
    WHEN 'true' THEN 1
    WHEN 'false' THEN 0
  END +
  CASE sandstorm_cargo_to_cargo_ship
    WHEN 'true' THEN 1
    WHEN 'false' THEN 0
  END
) as average_cargo_per_game
FROM cycles WHERE visible = true AND id > 178 AND match_key ~ '2019isde4' GROUP BY team_number
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
) DESC;

SELECT team_number, COUNT(visible = true) AS number_of_matches,
/* Climb */
AVG(CASE climb
  WHEN 'nothing' THEN 0
  WHEN 'failed' THEN 0
  WHEN 'level1' THEN 3
  WHEN 'level2' THEN 6
  WHEN 'level3' THEN 12
END) as climb_score_average
FROM cycles WHERE visible = true AND match_key ~ '2019isde4' GROUP BY team_number
ORDER BY AVG(CASE climb
  WHEN 'nothing' THEN 0
  WHEN 'failed' THEN 0
  WHEN 'level1' THEN 3
  WHEN 'level2' THEN 6
  WHEN 'level3' THEN 12
END) DESC;

/*
  Defencive robots
 */
SELECT team_number, COUNT(visible = true) AS number_of_matches,
  defence_comment
FROM cycles WHERE visible = true AND defence_state = 'defended' GROUP BY team_number;
