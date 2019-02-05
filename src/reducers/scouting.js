import { scouting } from './initial-state.js'

export default (state = scouting, action) => {
  switch (action.type) {
    case 'DISTRICT_KEY':
      return {
        ...state,
        districtKey: action.districtKey
      }

    case 'SELECT_MATCH':
      return {
        ...state,
        match: action.match
      }

    default:
      return state
  }
}
