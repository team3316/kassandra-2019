import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'

import 'style/index.scss'
import 'style/carbon.scss'

import Scouting from 'containers/Scouting.jsx'
import Matchlist from 'containers/MatchlistApp.jsx'
import Strategy from 'containers/Strategy.jsx'
import reducers from 'reducers/reducers.js'

/**
 * Gets the current district and event from enviornment variables (during bundling)
 */
const districtKey = process.env.DISTRICT_KEY
const currentEventKey = process.env.CURRENT_EVENT

/**
 * Redux store
 * Uses Thunk middleware for async functions
 */
const store = createStore(
  reducers,
  applyMiddleware(thunk, logger)
)

/**
 * Dispatches the current district key e.g. 2018isr
 */
store.dispatch({
  type: 'DISTRICT_KEY',
  districtKey
})

/**
 * Dispatches the current ongoing event
 */
store.dispatch({
  type: 'CURRENT_EVENT',
  currentEventKey
})

render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route path='/strategy' render={props => <Strategy {...props} />} />
        <Route path='/matchlist' render={props => <Matchlist {...props} {...props.match} />} />
        <Route path='/' render={props => <Scouting {...props} {...props.match} />} />
      </Switch>
    </Router>
  </Provider>,
  document.querySelector('#root'))
