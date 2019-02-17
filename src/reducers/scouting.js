import { scouting } from './initial-state.js'

export default (state = scouting, action) => {
  switch (action.type) {
    /**
     * Selecting a match and a team
     */
    case 'DISTRICT_KEY':
      return {
        ...state,
        districtKey: action.districtKey
      }

    case 'REQUEST_MATCHES':
      return {
        ...state,
        match: {},
        isMatchSelected: false,
        team: {}
      }

    case 'SELECT_MATCH':
      return {
        ...state,
        match: action.match,
        isMatchSelected: true
      }

    case 'SELECT_TEAM':
      return {
        ...state,
        team: action.team
      }

    /**
     * Sandstorm
     */
    case 'TOGGLE_HAB':
      return {
        ...state,
        sandstorm: {
          habLine: !state.sandstorm.habLine
        }
      }

    case 'TOGGLE_AUTO_PANEL_CARGO_SHIP':
      return {
        ...state,
        sandstorm: {
          cargoShipPanels: !state.sandstorm.cargoShipPanels
        }
      }

    case 'TOGGLE_AUTO_PANEL_ROCKET':
      return {
        ...state,
        sandstorm: {
          rocketPanels: !state.sandstorm.rocketPanels
        }
      }

    case 'TOGGLE_AUTO_CARGO_CARGO_SHIP':
      return {
        ...state,
        sandstorm: {
          cargoShipCargo: !state.sandstorm.cargoShipCargo
        }
      }

    case 'TOGGLE_AUTO_CARGO_ROCKET':
      return {
        ...state,
        sandstorm: {
          rocketCargo: !state.sandstorm.rocketCargo
        }
      }

    /**
     * Teleoperated
     */
    case 'TOGGLE_DECREMENT':
      return {
        ...state,
        teleop: {
          decrement: !state.teleop.decrement
        }
      }

    /**
     * Increments
     */
    case 'INCREMENT_CARGO_CARGO_SHIP':
      return {
        ...state,
        teleop: {
          cargo: {
            cargoShip: state.cargo.cargoShip + 1
          }
        }
      }

    case 'INCREMENT_CARGO_LEVEL1':
      return {
        ...state,
        teleop: {
          cargo: {
            level1: state.cargo.level1 + 1
          }
        }
      }

    case 'INCREMENT_CARGO_LEVEL2':
      return {
        ...state,
        teleop: {
          cargo: {
            level2: state.cargo.level2 + 1
          }
        }
      }

    case 'INCREMENT_CARGO_LEVEL3':
      return {
        ...state,
        teleop: {
          cargo: {
            level3: state.cargo.level3 + 1
          }
        }
      }

    case 'INCREMENT_PANEL_CARGO_SHIP':
      return {
        ...state,
        teleop: {
          panels: {
            cargoShip: state.panels.cargoShip + 1
          }
        }
      }

    case 'INCREMENT_PANEL_LEVEL1':
      return {
        ...state,
        teleop: {
          panels: {
            level1: state.panels.level1 + 1
          }
        }
      }

    case 'INCREMENT_PANEL_LEVEL2':
      return {
        ...state,
        teleop: {
          panels: {
            level2: state.panels.level2 + 1
          }
        }
      }

    case 'INCREMENT_PANEL_LEVEL3':
      return {
        ...state,
        teleop: {
          panels: {
            level3: state.panels.level3 + 1
          }
        }
      }

    /**
     * Decrements
     */
    case 'DECREMENT_CARGO_CARGO_SHIP':
      return {
        ...state,
        teleop: {
          cargo: {
            cargoShip: state.cargo.cargoShip - 1
          }
        }
      }

    case 'DECREMENT_CARGO_LEVEL1':
      return {
        ...state,
        teleop: {
          cargo: {
            level1: state.cargo.level1 - 1
          }
        }
      }

    case 'DECREMENT_CARGO_LEVEL2':
      return {
        ...state,
        teleop: {
          cargo: {
            level2: state.cargo.level2 - 1
          }
        }
      }

    case 'DECREMENT_CARGO_LEVEL3':
      return {
        ...state,
        teleop: {
          cargo: {
            level3: state.cargo.level3 - 1
          }
        }
      }

    case 'DECREMENT_PANEL_CARGO_SHIP':
      return {
        ...state,
        teleop: {
          panels: {
            cargoShip: state.panels.cargoShip - 1
          }
        }
      }

    case 'DECREMENT_PANEL_LEVEL1':
      return {
        ...state,
        teleop: {
          panels: {
            level1: state.panels.level1 - 1
          }
        }
      }

    case 'DECREMENT_PANEL_LEVEL2':
      return {
        ...state,
        teleop: {
          panels: {
            level2: state.panels.level2 - 1
          }
        }
      }

    case 'DECREMENT_PANEL_LEVEL3':
      return {
        ...state,
        teleop: {
          panels: {
            level3: state.panels.level3 - 1
          }
        }
      }

    /**
     * Endgame
     */
    case 'CLIMB':
      return {
        ...state,
        climb: action.level
      }

    default:
      return state
  }
}
