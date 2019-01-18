export default (state = {
  isFetchingEvents: false,
  isFetchingMatches: false,
  currentEventKey: '',
  districtKey: '',
  eventKey: '',
  events: [],
  matches: [],
  team: ''
}, action) => {
  switch (action.type) {
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

    case 'DISTRICT_KEY':
      return {
        ...state,
        districtKey: action.districtKey
      }

    case 'CURRENT_EVENT':
      return {
        ...state,
        currentEventKey: action.currentEventKey
      }

    case 'REQUEST_MATCHES':
      return {
        ...state,
        isFetchingMatches: true,
        eventKey: action.eventKey
      }

    case 'RECIEVE_MATCHES':
      return {
        ...state,
        isFetchingMatches: false,
        eventKey: action.eventKey,
        matches: action.matches
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
