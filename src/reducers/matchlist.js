import { matchlist } from './initial-state.js'

export default (state = matchlist, action) => {
  switch (action.type) {
    case 'DISTRICT_KEY':
      return {
        ...state,
        districtKey: action.districtKey
      }

    case 'CURRENT_EVENT':
      return {
        ...state,
        currentEventKey: action.currentEventKey,
        event: {
          key: action.currentEventKey
        }
      }

    case 'REQUEST_EVENTS':
      return {
        ...state,
        isFetchingEvents: true,
        districtKey: action.districtKey
      }

    case 'RECIEVE_EVENTS':
      return {
        ...state,
        isFetchingEvents: false,
        events: action.events,
        districtKey: action.districtKey
      }

    case 'REQUEST_MATCHES':
      return {
        ...state,
        isFetchingMatches: true,
        event: action.event
      }

    case 'RECIEVE_MATCHES':
      return {
        ...state,
        isFetchingMatches: false,
        event: action.event,
        matches: action.matches
      }

    case 'FILTER_MATCHES':
      return {
        ...state,
        team: action.team
      }

    default:
      return state
  }
}
