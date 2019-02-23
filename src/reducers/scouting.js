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
          ...state.sandstorm,
          habLine: !state.sandstorm.habLine
        }
      }

    case 'TOGGLE_SANDSTORM_CARGO_TO_CARGO_SHIP':
      return {
        ...state,
        sandstorm: {
          ...state.sandstorm,
          cargoToCargoShip: !state.sandstorm.cargoToCargoShip
        }
      }

    case 'TOGGLE_SANDSTORM_CARGO_TO_ROCKET':
      return {
        ...state,
        sandstorm: {
          ...state.sandstorm,
          cargoToRocket: !state.sandstorm.cargoToRocket
        }
      }

    case 'TOGGLE_SANDSTORM_PANEL_TO_CARGO_SHIP':
      return {
        ...state,
        sandstorm: {
          ...state.sandstorm,
          panelToCargoShip: !state.sandstorm.panelToCargoShip
        }
      }

    case 'TOGGLE_SANDSTORM_PANEL_TO_ROCKET':
      return {
        ...state,
        sandstorm: {
          ...state.sandstorm,
          panelToRocket: !state.sandstorm.panelToRocket
        }
      }

    /**
     * Teleoperated
     */
    case 'TOGGLE_DECREMENT':
      return {
        ...state,
        teleop: {
          ...state.teleop,
          shouldDecrement: !state.teleop.shouldDecrement
        }
      }

    /**
     * Sets shouldDecrement to true
     * Used after moving views
     */
    case 'SET_INCREMENT':
      return {
        ...state,
        teleop: {
          ...state.teleop,
          shouldDecrement: false
        }
      }

    /**
     * Increments
     */
    case 'INCREMENT_CARGO_CARGO_SHIP':
      return {
        ...state,
        teleop: {
          ...state.teleop,
          cargo: {
            ...state.teleop.cargo,
            cargoShip: state.teleop.cargo.cargoShip + 1
          }
        }
      }

    case 'INCREMENT_CARGO_LEVEL1':
      return {
        ...state,
        teleop: {
          ...state.teleop,
          cargo: {
            ...state.teleop.cargo,
            level1: state.teleop.cargo.level1 + 1
          }
        }
      }

    case 'INCREMENT_CARGO_LEVEL2':
      return {
        ...state,
        teleop: {
          ...state.teleop,
          cargo: {
            ...state.teleop.cargo,
            level2: state.teleop.cargo.level2 + 1
          }
        }
      }

    case 'INCREMENT_CARGO_LEVEL3':
      return {
        ...state,
        teleop: {
          ...state.teleop,
          cargo: {
            ...state.teleop.cargo,
            level3: state.teleop.cargo.level3 + 1
          }
        }
      }

    case 'INCREMENT_PANEL_CARGO_SHIP':
      return {
        ...state,
        teleop: {
          ...state.teleop,
          panels: {
            ...state.teleop.panels,
            cargoShip: state.teleop.panels.cargoShip + 1
          }
        }
      }

    case 'INCREMENT_PANEL_LEVEL1':
      return {
        ...state,
        teleop: {
          ...state.teleop,
          panels: {
            ...state.teleop.panels,
            level1: state.teleop.panels.level1 + 1
          }
        }
      }

    case 'INCREMENT_PANEL_LEVEL2':
      return {
        ...state,
        teleop: {
          ...state.teleop,
          panels: {
            ...state.teleop.panels,
            level2: state.teleop.panels.level2 + 1
          }
        }
      }

    case 'INCREMENT_PANEL_LEVEL3':
      return {
        ...state,
        teleop: {
          ...state.teleop,
          panels: {
            ...state.teleop.panels,
            level3: state.teleop.panels.level3 + 1
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
          ...state.teleop,
          cargo: {
            ...state.teleop.cargo,
            cargoShip: state.teleop.cargo.cargoShip - 1
          }
        }
      }

    case 'DECREMENT_CARGO_LEVEL1':
      return {
        ...state,
        teleop: {
          ...state.teleop,
          cargo: {
            ...state.teleop.cargo,
            level1: state.teleop.cargo.level1 - 1
          }
        }
      }

    case 'DECREMENT_CARGO_LEVEL2':
      return {
        ...state,
        teleop: {
          ...state.teleop,
          cargo: {
            ...state.teleop.cargo,
            level2: state.teleop.cargo.level2 - 1
          }
        }
      }

    case 'DECREMENT_CARGO_LEVEL3':
      return {
        ...state,
        teleop: {
          ...state.teleop,
          cargo: {
            ...state.teleop.cargo,
            level3: state.teleop.cargo.level3 - 1
          }
        }
      }

    case 'DECREMENT_PANEL_CARGO_SHIP':
      return {
        ...state,
        teleop: {
          ...state.teleop,
          panels: {
            ...state.teleop.panels,
            cargoShip: state.teleop.panels.cargoShip - 1
          }
        }
      }

    case 'DECREMENT_PANEL_LEVEL1':
      return {
        ...state,
        teleop: {
          ...state.teleop,
          panels: {
            ...state.teleop.panels,
            level1: state.teleop.panels.level1 - 1
          }
        }
      }

    case 'DECREMENT_PANEL_LEVEL2':
      return {
        ...state,
        teleop: {
          ...state.teleop,
          panels: {
            ...state.teleop.panels,
            level2: state.teleop.panels.level2 - 1
          }
        }
      }

    case 'DECREMENT_PANEL_LEVEL3':
      return {
        ...state,
        teleop: {
          ...state.teleop,
          panels: {
            ...state.teleop.panels,
            level3: state.teleop.panels.level3 - 1
          }
        }
      }

    /**
     * Endgame
     *
     * Gets action.level for climb level
     */
    case 'CLIMB':
      return {
        ...state,
        endgame: {
          ...state.endgame,
          climb: action.level
        }
      }

    /**
     * Gets action.comment for the comments
     */
    case 'COMMENT':
      return {
        ...state,
        endgame: {
          ...state.endgame,
          comment: action.comment
        }
      }

    /**
     * Toggle tech fouls
     */
    case 'TOGGLE_TECH_FOULS':
      return {
        ...state,
        endgame: {
          ...state.endgame,
          techFouls: !state.endgame.techFouls
        }
      }

    default:
      return state
  }
}
