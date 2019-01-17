export default (state = {
  isFetchingEvents: false,
  isFetchingMatches: false,
  districtKey: '',
  eventKey: '',
  events: [],
  matches: []
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

    default:
      return state
  }
}
