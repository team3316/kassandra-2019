import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { AreaStack } from '@vx/shape'
import { scaleLinear, scaleBand } from '@vx/scale'

class GameObjectGraph extends Component {
  render () {
    const {
      matches,
      width,
      gameObject,
      height
    } = this.props

    const keys = Object.keys(matches[0].teleop[gameObject])

    const x = d => d.map(({ matchKey }) => matchKey.replace(/.*_/))
    const y0 = d => d[0]
    const y1 = d => d[1]

    const xScale = scaleBand({ range: [0, width] })
    const yScale = scaleLinear({ range: [height, 0] })

    return (
      <svg width={width} height={height}>
        <AreaStack
          keys={keys}
          data={matches}
          width={width}
          height={height}
          x={d => xScale(x(d.data))}
          y0={d => yScale(y0(d))}
          y1={d => yScale(y1(d))}
        >
          {area => {
            const { path, stacks } = area

            return stacks.map(stack => <path
              key={`stack-${stack.key}`}
              d={path(stack)}
            />)
          }}
        </AreaStack>
      </svg>
    )
  }
}

GameObjectGraph.propTypes = {
  gameObject: PropTypes.string.isRequired,
  matches: PropTypes.array.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired
}

export default GameObjectGraph
