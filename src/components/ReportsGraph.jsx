import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  VictoryAxis,
  VictoryTheme,
  VictoryChart,
  VictoryScatter,
  VictoryStack
} from 'victory'

const graphTheme = {
  ...VictoryTheme.material
}

const SCATTER_TICK_VALUES = [
  'Tech Foul',
  'Climb',
  '[S] RT Panel',
  '[S] RT Cargo',
  '[S] CS Panel',
  '[S] CS Cargo',
  'HAB Line'
]

const tickValuesToProps = {
  'Tech Foul': 'techFouls',
  'Climb': 'climb',
  '[S] RT Panel': 'sandstorm.panelToRocket',
  '[S] RT Cargo': 'sandstorm.cargoToRocket',
  '[S] CS Panel': 'sandstorm.panelToCargoShip',
  '[S] CS Cargo': 'sandstorm.cargoToCargoShip',
  'HAB Line': 'sandstorm.habLine'
}

const ticksStyle = {
  tickLabels: {
    fontFamily: '-apple-system, BlinkMacSystemFont, \'Helvetica Neue\', \'Roboto\', Arial, sans-serif'
  }
}

class ReportsGraph extends Component {
  render () {
    const {
      matches
    } = this.props

    const getMatchID = matchKey => matchKey.split('_')[1].toUpperCase()

    const scatters = SCATTER_TICK_VALUES.filter(t => !/climb/i.test(t)).map((tick, i) => {
      const prop = tickValuesToProps[tick]

      return (
        <VictoryScatter
          key={tick}
          name={tick}
          data={matches.map(match => {
            const symbol = (!prop.includes('sandstorm') ? match[prop] : match['sandstorm'][prop.split('.')[1]]) ? 'square' : 'triangleDown'
            console.log(prop, i, symbol)
            return {
              x: getMatchID(match.matchKey),
              y: i,
              symbol
            }
          })}
        />
      )
    })

    return (
      <div style={{ width: '85%', height: '370px', margin: '0 auto' }}>
        <VictoryChart
          theme={graphTheme}
          width={window.innerWidth * 0.72}
          domainPadding={{ x: 10 }}
        >
          <VictoryAxis
            tickValues={matches.map((match, index) => index)}
            style={ticksStyle} />
          <VictoryAxis
            dependentAxis
            tickValues={SCATTER_TICK_VALUES}
            domain={[0, 6]}
            style={ticksStyle}
          />
          <VictoryStack colorScale={'blue'}>
            {scatters}
          </VictoryStack>
        </VictoryChart>
      </div>
    )
  }
}

ReportsGraph.propTypes = {
  matches: PropTypes.array.isRequired
}

export default ReportsGraph
