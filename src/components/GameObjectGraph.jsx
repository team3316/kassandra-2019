import React from 'react'
import PropTypes from 'prop-types'
import ReactEchartsCore from 'echarts-for-react/lib/core'
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/line'

/**
 * This component renders a stacked areas graph to show how many
 * @param {Object} data The data for the graphs
 */
const GameObjectGraph = ({ data }) => {
  /**
   * The eCharts options parameter.
   * Contains the data for the graph and configuration for visualisation
   * @type {Object}
   */
  const option = {
    // Graph titles
    title: { text: 'Game objects' },

    // Axis position tooltip
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: { backgroundColor: '#6a7985' }
      }
    },

    // Graph legend
    legend: { data: ['Low Cargo', 'High Cargo', 'Low Panels', 'High Panels'] },

    // Graph grid
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },

    /**
     * x Axis
     * Values are match id
     * Text color changes according to defence state
     */
    xAxis: {
      type: 'category',
      boundryGap: false,
      data: data.map(datum => {
        const matchKey = { value: datum.matchKey.replace('_', '').toUpperCase() }

        /**
         * Switches text color according to defence state
         * No defence: black
         * Performed defence: blue
         * Was under defencce: red
         */
        const { defenceState } = datum
        switch (defenceState) {
          case 'offended':
            return {
              ...matchKey,
              textStyle: { color: 'red' }
            }
          case 'defended':
            return {
              ...matchKey,
              textStyle: { color: 'blue' }
            }
        }
      })
    },
    yAxis: { type: 'value' },
    series: [{
      name: 'Low Cargo',
      type: 'line',
      stack: 'teleop',
      areaStyle: {},
      label: {
        normal: {
          show: true,
          position: 'top'
        }
      },
      data: data.map(datum => datum.lowCargo)
    }, {
      name: 'High Cargo',
      type: 'line',
      stack: 'teleop',
      areaStyle: {},
      label: {
        normal: {
          show: true,
          position: 'top'
        }
      },
      data: data.map(datum => datum.highCargo)
    }, {
      name: 'Low Panels',
      type: 'line',
      stack: 'teleop',
      areaStyle: {},
      label: {
        normal: {
          show: true,
          position: 'top'
        }
      },
      data: data.map(datum => datum.lowPanels)
    }, {
      name: 'High Panels',
      type: 'line',
      stack: 'teleop',
      areaStyle: {},
      label: {
        normal: {
          show: true,
          position: 'top'
        }
      },
      data: data.map(datum => datum.highPanels)
    }]
  }

  return (
    <ReactEchartsCore
      echarts={echarts}
      option={option}
    />
  )
}

GameObjectGraph.propTypes = {
  data: PropTypes.array.isRequired
}

export default GameObjectGraph
