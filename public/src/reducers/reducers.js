import { combineReducers } from 'redux'

const scouting = (state = {
  isFetchingEvents: false,
  districtKey: '',
  events: []
}, action) => {
  switch (action.type) {
    case 'REQUEST_EVENTS':
      return { ...state, isFetchingEvents: true, districtKey: action.districtKey }
    case 'RECIEVE_EVENTS':
      return { ...state, isFetchingEvents: false, events: action.events }
    default:
      return state
  }
}

export default combineReducers({ scouting })
