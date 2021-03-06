import React from 'react'
import PropTypes from 'prop-types'
import { ContentSwitcher, Switch, TextArea } from 'carbon-components-react'
import { TeamInput } from 'components'
import { FiShield as Shield, FiShieldOff as ShieldOff } from 'react-icons/fi'
import { GiBroadsword as Sword } from 'react-icons/gi'

const Defence = ({ state, actions }) => {
  const defenceStates = ['non', 'defended', 'offended']

  return (
    <div>
      <span className='title'> <Shield /> Defence </span>
      <ContentSwitcher
        onChange={target => actions('state', target.name)}
        selectedIndex={defenceStates.indexOf(state.state)}>
        <Switch name='non' text='No defence' icon={<ShieldOff />} />
        <Switch name='defended' text='Defended' icon={<Shield />} />
        <Switch name='offended' text='Was under defence' icon={<Sword />} />
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
              value={Number(state.offender)}
              id={'offender'}
            />
            : <div className='empty' />
      }
    </div>
  )
}

Defence.propTypes = {
  state: PropTypes.object.isRequired,
  actions: PropTypes.func.isRequired
}

export default Defence
