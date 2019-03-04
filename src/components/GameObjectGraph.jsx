import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { VictoryAxis, VictoryTheme, VictoryChart, VictoryStack, VictoryArea } from 'victory'

const graphTheme = {
  ...VictoryTheme.material
}

console.log(JSON.stringify(VictoryTheme.material))

class GameObjectGraph extends Component {
  render () {
    const {
      matches,
      gameObject,
      height,
      width
    } = this.props

    const keys = Object.keys(matches[0].teleop[gameObject]).reverse()

    const stacks = []

    keys.forEach(key => {
      let color
      switch (key) {
        case 'cargoShip':
          color = '#4285F4'
          break
        case 'level1':
          color = '#EA4335'
          break
        case 'level2':
          color = '#FBBC05'
          break
        case 'level3':
          color = '#34A853'
          break
      }

      stacks.unshift(<VictoryArea
        key={key}
        name={key}
        data={matches.map((match, index) => ({
          x: index,
          y: match.teleop[gameObject][key]
        }))}
        style={{
          data: { fill: color }
        }}
      />)
    })

    return (
      <div>
        <VictoryChart
          theme={graphTheme}
          height={height}
          width={width}
        >
          <VictoryAxis tickCount={matches.length}
            style={{ tickLabels: { fontFamily: '-apple-system, BlinkMacSystemFont, \'Helvetica Neue\', \'Roboto\', Arial, sans-serif' } }} />
          <VictoryAxis dependentAxis />
          <VictoryStack colorScale={'blue'}>
            { stacks }
          </VictoryStack>
        </VictoryChart>
      </div>
    )
  }
}

GameObjectGraph.propTypes = {
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  matches: PropTypes.array.isRequired,
  gameObject: PropTypes.string.isRequired
}

export default GameObjectGraph
