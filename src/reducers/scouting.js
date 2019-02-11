import { scouting } from './initial-state.js'

export default (state = scouting, action) => {
  switch (action.type) {
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

    default:
      return state
  }
}
