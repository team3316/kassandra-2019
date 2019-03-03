import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { VictoryTheme, VictoryChart, VictoryStack, VictoryArea } from 'victory'

const graphTheme = {
  ...VictoryTheme.material,
  axis: {
    ...VictoryTheme.material.axis,
    fill: '#000'
  }
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

    console.log(JSON.stringify(keys, null, 2))

    const stacks = []

    keys.forEach(key => {
      let color
      switch (key) {
        case 'cargoShip':
          color = '#ff9933'
          break
        case 'level1':
          color = '#3498db'
          break
        case 'level2':
          color = '#9b59b6'
          break
        case 'level3':
          color = '#1abc9c'
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
          data: {
            fill: color,
          },
          labels: {
            fontFamily: '-apple-system, BlinkMacSystemFont, \'Helvetica Neue\', \'Roboto\', Arial, sans-serif'
          }
        }}
      />)
    })

    return (
      <VictoryChart
        style={{ labels: { fontFamily: '-apple-system, BlinkMacSystemFont, \'Helvetica Neue\', \'Roboto\', Arial, sans-serif' } }}
        theme={graphTheme}
        height={height}
        width={width}
      >
        <VictoryStack>
          { stacks }
        </VictoryStack>
      </VictoryChart>
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
