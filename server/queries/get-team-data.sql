/*
  This query returns the sum of installations to the high and low goals
 */
SELECT
/*
  Returns the sum of installations to level 1 and cargo ship,
  includes sandstorm installation
 */
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

FROM cycles WHERE team_number = 1690 AND match_key ~ '2019isde4' AND visible = true;
