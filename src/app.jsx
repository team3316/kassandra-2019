import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'

import './style/index.scss'

import Example from './components/Example.jsx'
import Scouting from './containers/Scouting.jsx'
import Matchlist from './containers/MatchlistApp.jsx'
import reducers from './reducers/reducers.js'

const districtKey = process.env.DISTRICT_KEY
const currentEventKey = process.env.CURRENT_EVENT

const store = createStore(
  reducers,
  applyMiddleware(thunk, logger)
)

store.dispatch({
  type: 'DISTRICT_KEY',
  districtKey
})

store.dispatch({
  type: 'CURRENT_EVENT',
  currentEventKey
})

render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route exact path='/testing' component={Example} />
        <Route exact path='/matchlist' component={Matchlist} />
        <Route exact path='/' component={Scouting} />
      </Switch>
    </Router>
  </Provider>,
  document.querySelector('#root'))
