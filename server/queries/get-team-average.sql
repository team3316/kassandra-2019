SELECT AVG(teleop_cargo_to_cargo_ship + teleop_cargo_to_level1 + teleop_cargo_to_level2 + teleop_cargo_to_level3 +
  CASE sandstorm_cargo_to_rocket
  WHEN 'true' THEN 1
  WHEN 'false' THEN 0
  END +
  CASE sandstorm_cargo_to_cargo_ship
  WHEN 'true' THEN 1
  WHEN 'false' THEN 0
  END
) as "averageCargoPerGame",

AVG(teleop_panels_to_cargo_ship + teleop_panels_to_level1 + teleop_panels_to_level2 + teleop_panels_to_level3 +
  CASE sandstorm_panel_to_rocket
  WHEN 'true' THEN 1
  WHEN 'false' THEN 0
  END +
  CASE sandstorm_panel_to_cargo_ship
  WHEN 'true' THEN 1
  WHEN 'false' THEN 0
  END
) as "averagePanelsPerGame"
FROM cycles WHERE team_number = 1690 AND match_key ~ '2019isde4' AND visible = true;
