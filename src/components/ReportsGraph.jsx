import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  VictoryAxis,
  VictoryTheme,
  VictoryChart,
  VictoryScatter
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
            domain={[0, 8]}
            style={ticksStyle}
          />
          <VictoryScatter width={window.innerWidth * 0.6} />
        </VictoryChart>
      </div>
    )
  }
}

ReportsGraph.propTypes = {
  matches: PropTypes.array.isRequired
}

export default ReportsGraph
