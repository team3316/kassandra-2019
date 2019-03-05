import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  VictoryAxis,
  VictoryTheme,
  VictoryChart,
  VictoryStack,
  VictoryArea
} from 'victory'

const graphTheme = {
  ...VictoryTheme.material
}

class GameObjectGraph extends Component {
  render () {
    const {
      matches,
      gameObject,
      height,
      width
    } = this.props

    const keys = Object.keys(matches[0].teleop[gameObject]).reverse()

    /**
     * An array of areas
     * @type {Array}
     */
    const stacks = []

    const getColorForKey = key => {
      switch (key) {
        case 'cargoShip': return '#4285F4'
        case 'level1': return '#EA4335'
        case 'level2': return '#FBBC05'
        case 'level3': return '#34A853'
      }
    }

    const getMatchID = matchKey => matchKey.split('_')[1].toUpperCase()

    // When the graph has 1 data point, it will look like a line.
    // Add another item to the list so that it would look like an actual area graph
    if (matches.length === 1) {
      const actualData = matches[0]
      matches[0] = {
        matchKey: '_ ', // An empty string looks weird, so a space is needed
        teleop: actualData.teleop
      }

      matches.push(actualData)
      console.log(matches)
    }

    keys.forEach(key => {
      stacks.unshift(<VictoryArea
        key={key}
        name={key}
        data={matches.map(({ matchKey, teleop }) => ({
          x: getMatchID(matchKey),
          y: teleop[gameObject][key]
        }))}
        style={{
          data: { fill: getColorForKey(key) }
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
          <VictoryAxis
            tickValues={matches.map((match, index) => index)}
            style={{ tickLabels: { fontFamily: '-apple-system, BlinkMacSystemFont, \'Helvetica Neue\', \'Roboto\', Arial, sans-serif' } }} />
          <VictoryAxis
            dependentAxis
            style={{ tickLabels: { fontFamily: '-apple-system, BlinkMacSystemFont, \'Helvetica Neue\', \'Roboto\', Arial, sans-serif' } }}
          />
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
