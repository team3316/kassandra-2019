/**
 * Adds cycles to the database
 *
 * Request body format at new-cycle.json
 */
const { Cycle } = require('../db')

module.exports = ({ body }, res) => {
  Cycle.create({
    match_id: body.matchId,
    team_number: body.teamNumber,

    sandstorm_control_method: body.sandstorm.controlMethod,
    sandstorm_hab_line: body.sandstorm.habLine,
    sandstorm_cargo_ship_panels: body.sandstorm.cargoShipPanels,
    sandstorm_cargo_ship_cargo: body.sandstorm.cargoShipCargo,
    sandstorm_rocket_panels: body.sandstorm.rocketPanels,
    sandstorm_rocket_cargo: body.sandstorm.rocketCargo,

    teleop_cargo_ship_panels: body.teleop.panels.cargoShip,
    teleop_cargo_ship_cargo: body.teleop.cargo.cargoShip,
    teleop_level1_panels: body.teleop.panels.level1,
    teleop_level2_panels: body.teleop.panels.level2,
    teleop_level3_panels: body.teleop.panels.level3,
    teleop_level1_cargo: body.teleop.cargo.level1,
    teleop_level2_cargo: body.teleop.cargo.level2,
    teleop_level3_cargo: body.teleop.cargo.level3,

    climb: body.climb,
    comments: body.comments,
    tech_fouls: body.tech_fouls
  })
  res.status(200).send('Cycle inserted \n' + JSON.stringify(body, null, 2))
}
