/**
 * Adds cycles to the database
 *
 * Request body format at new-cycle.json
 */
const { Cycle } = require('../db')

module.exports = ({ body }, res) => {
  Cycle.create({
    match_key: body.matchKey,
    team_number: body.teamNumber,

    sandstorm_hab_line: body.sandstorm.habLine,
    sandstorm_cargo_to_cargo_ship: body.sandstorm.cargoToCargoShip,
    sandstorm_cargo_to_rocket: body.sandstorm.cargoToRocket,
    sandstorm_panel_to_cargo_ship: body.sandstorm.panelToCargoShip,
    sandstorm_panel_to_rocket: body.sandstorm.panelToRocket,

    teleop_cargo_to_ship: body.teleop.cargo.cargoShip,
    teleop_cargo_to_level1: body.teleop.cargo.level1,
    teleop_cargo_to_level2: body.teleop.cargo.level2,
    teleop_cargo_to_level3: body.teleop.cargo.level3,
    teleop_panels_to_cargo_ship: body.teleop.panels.cargoShip,
    teleop_panels_to_level1: body.teleop.panels.level1,
    teleop_panels_to_level2: body.teleop.panels.level2,
    teleop_panels_to_level3: body.teleop.panels.level3,

    climb: body.climb,
    comment: body.comment,
    tech_fouls: body.tech_fouls
  })
  res.status(200).send('Cycle inserted \n' + JSON.stringify(body, null, 2))
}
