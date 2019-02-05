import { combineReducers } from 'redux'
import matchlist from './matchlist.js'
import scouting from './scouting.js'

export default combineReducers({
  matchlist,
  scouting
})
