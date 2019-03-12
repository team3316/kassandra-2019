import React from 'react'
import PropTypes from 'prop-types'
import { ContentSwitcher, Switch, TextArea } from 'carbon-components-react'
import { TeamInput } from 'components'

const Defence = ({ state, actions }) => {
  const defenceStates = ['non', 'defended', 'offended']

  return (
    <div>
      <span className='title'> Defence </span>
      <br />
      <ContentSwitcher
        onChange={target => actions('state', target.name)}
        selectedIndex={defenceStates.indexOf(state.state)}>
        <Switch name='non' text='No defence' />
        <Switch name='defended' text='Defended' />
        <Switch name='offended' text='Was under defence' />
      </ContentSwitcher>
      <br />
      {
        state.state === 'defended'
          ? <TextArea
            light
            labelText='Defence comments'
            placeholder={'Write your comments on the robots defence here \n' +
            'Aggressive, ineffective, targeting a single robot etc.'}
            onChange={({ target }) => actions('comment', target.value)}
            value={state.comment}
          />
          : state.state === 'offended'
            ? <TeamInput
              onChange={team => actions('offender', team)}
              value={state.offedner}
              id={'offender'}
            />
            : <div className='empty' />
      }
    </div>
  )
}

Defence.propTypes = {
  state: PropTypes.object.isRequired,
  actions: PropTypes.function.isRequired
}

export default Defence
