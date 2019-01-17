import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'

import Example from './components/Example.jsx'
import Container from './containers/MatchlistApp.jsx'
import reducers from './reducers/reducers.js'

const districtKey = process.env.DISTRICT_KEY

const store = createStore(
  reducers,
  applyMiddleware(thunk, logger)
)

store.dispatch({
  type: 'DISTRICT_KEY',
  districtKey
})

render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route exact path='/' component={Example} />
        <Route exact path='/matchlist' component={Container} />
      </Switch>
    </Router>
  </Provider>,
  document.querySelector('#root'))
