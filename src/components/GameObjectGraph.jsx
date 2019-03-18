import React, { Component } from 'react'
import PropTypes from 'prop-types'

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
    const matchesToUse = matches.length === 1
      ? [{ matchKey: '_ ', teleop: matches[0].teleop }, matches[0]]
      : matches

    keys.forEach((key, i) => {
      const labels = matchesToUse.map(({ teleop }) => {
        const y = teleop[gameObject][key]
        if (i === 0) return y

        const dy = y - teleop[gameObject][keys[i - 1]]
        return dy > 0 ? dy : undefined
      })

      stacks.unshift(<VictoryArea
        key={key}
        name={key}
        data={matchesToUse.map(({ matchKey, teleop }) => ({
          x: getMatchID(matchKey),
          y: teleop[gameObject][key]
        }))}
        labels={labels}
        labelComponent={<VictoryLabel dy={5} />}
        style={{
          data: { fill: getColorForKey(key) }
        }}
      />)
    })

    return (
      <VictoryChart
        theme={graphTheme}
        height={height}
        width={width}
        domainPadding={{ x: 10 }}
      >
        <VictoryAxis
          tickValues={matchesToUse.map((match, index) => index)}
          style={{ tickLabels: { fontFamily: '-apple-system, BlinkMacSystemFont, \'Helvetica Neue\', \'Roboto\', Arial, sans-serif' } }} />
        <VictoryAxis
          dependentAxis
          domain={[0, 15]}
          style={{ tickLabels: { fontFamily: '-apple-system, BlinkMacSystemFont, \'Helvetica Neue\', \'Roboto\', Arial, sans-serif' } }}
        />
        <VictoryStack colorScale={'blue'}>
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
