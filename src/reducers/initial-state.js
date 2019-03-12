/**
 * Inital state for the match list
 * Used by all containers
 */
export const matchlist = {
  isFetchingEvents: false,
  isFetchingMatches: false,
  currentEventKey: '',
  districtKey: '',
  event: {},
  events: [],
  matches: null,
  team: ''
}

export const scouting = {
  match: null,
  team: null,
  sandstorm: {
    habLine: false,
    cargoToCargoShip: false,
    cargoToRocket: false,
    panelToCargoShip: false,
    panelToRocket: false
  },
  teleop: {
    decrement: false,
    cargo: {
      cargoShip: 0,
      level1: 0,
      level2: 0,
      level3: 0
    },
    panels: {
      cargoShip: 0,
      level1: 0,
      level2: 0,
      level3: 0
    }
  },
  endgame: {
    climb: {
      label: 'Nothing',
      value: 'nothing'
    },
    comment: '',
    /**
     * Describes the defence the team performed/was under
     * state: Describes if the team performed defence, defended or wasn't effected
     *   values: 'non', 'defending', 'offended'
     * comment: If the team performed defence, it describes the team defence
     * defendingTeam: If the team was under effective defence, shows the team number that defended
     */
    defence: {
      state: 'non',
      comment: '',
      offender: 0
    },
    techFouls: false
  },
  isSubmitting: false
}

export const strategy = {
  events: [],
  event: 'All',
  teams: [],
  team: null,
  isFetchingRecords: false,
  matches: []
}
