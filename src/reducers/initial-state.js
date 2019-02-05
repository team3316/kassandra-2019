export const matchlist = {
  isFetchingEvents: false,
  isFetchingMatches: false,
  currentEventKey: '',
  districtKey: '',
  eventKey: '',
  events: [],
  matches: [],
  team: ''
}

export const scouting = {
  teamNumber: 0,
  matchId: '',
  eventKey: '',
  sandstorm: {
    controlMethod: '',
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
