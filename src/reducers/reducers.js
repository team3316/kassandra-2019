import { combineReducers } from 'redux'
import matchlist from './matchlist.js'
import scouting from './scouting.js'
import strategy from './strategy.js'

export default combineReducers({
  matchlist,
  scouting,
  strategy
})
