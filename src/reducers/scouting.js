import { scouting } from './initial-state.js'

export default (state = scouting, action) => {
  switch (action.type) {
    /**
     * Home page
     */

    /**
     * Dispatching the selected district key e.g. 2019isr
     */
    case 'DISTRICT_KEY':
      return {
        ...state,
        districtKey: action.districtKey
      }

    /**
     * Indicating the app is current requesting matches from The Blue Alliance
     */
    case 'REQUEST_MATCHES':
      return {
        ...state,
        match: null,
        isMatchSelected: false,
        team: null
      }

    /**
     * Selecting a match
     */
    case 'SELECT_MATCH':
      return {
        ...state,
        match: action.match,
        isMatchSelected: true,
        team: null
      }

    /**
     * Selecting a team
     */
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
     * Climbing
     * @param {String} action.level The climb level
     * Permitted values: ['nothing', 'failed', 'level1', 'level2', 'level3']
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
     * Commenting
     * @param {String} action.comment The comments for the match
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

    /**
     * Change state to represent currently submitting the form
     */
    case 'REQUEST_SUBMIT':
      return {
        ...state,
        isSubmitting: true
      }

    /**
     * Change state to the next team in the same position in the next match,
     * and show that submitting has been completed
     */
    case 'NEXT_MATCH':
      return {
        ...state,
        isSubmitting: false,

        /**
         * If the match is a practice match
         * @type {Object}
         */
        match: state.match.comp_level !== 'PM'
          ? action.matches[state.match.index + 2]
          : {
            comp_level: 'PM',
            number: state.match.number + 1,
            name: `Practice ${state.match.number + 1}`,
            key: `${state.match.event_key}_${state.match.number + 1}`
          },

        /**
         * If the match is a practice match return null to team
         * If not, change the team number to the team at the same position
         * (index in alliance array) and change the team label accordingly
         * @type {Object}
         */
        team: state.match.comp_level !== 'PM' ? {
          ...state.team,

          number: action.matches[state.match.index + 2]
            .alliances[state.team.color].team_keys[state.team.index],

          label: `${action.matches[state.match.index + 2]
            .alliances[state.team.color].team_keys[state.team.index]}
             - ${state.team.color.charAt(0).toUpperCase()}${state.team.color.slice(1)} ${state.team.index + 1}`
        } : { number: 1, label: '1' },

        /**
         * Reset scouting parameters to their initial values
         * @type {Object}
         */
        sandstorm: scouting.sandstorm,
        teleop: scouting.teleop,
        endgame: scouting.endgame
      }

    default:
      return state
  }
}
