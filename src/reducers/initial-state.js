export const matchlist = {
  isFetchingEvents: false,
  isFetchingMatches: false,
  currentEventKey: '',
  districtKey: '',
  event: {},
  events: [],
  matches: [],
  team: ''
}

export const scouting = {
  match: {},
  team: {},
  isMatchSelected: false,
  sandstorm: {
    cargoShipPanels: false,
    cargoShipCargo: false,
    rocketPanels: false,
    rocketCargo: false,
    habLine: false
  },
  teleop: {
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
  climb: '',
  comments: '',
  techFouls: false
}
