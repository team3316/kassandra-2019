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
   * This functions formats the datapoint value for the label
   * If the value is bigger than 0 then show a label
   * @param  {Number} value The value of the data point
   * @return {Object}       The data point object
   */
  const label = value => ({
    value,
    label: { normal: { show: value > 0 } }
  })

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
    legend: {
      type: 'plain'
    },

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
        // Removing the event key from the match key
        // Initiating the object for the x axis value
        const matchKey = {
          value: datum.matchKey.replace(/\d{4}.*_/, '').toUpperCase()
        }

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

          default:
            return matchKey
        }
      })
    },
    yAxis: { type: 'value' },
    series: [{
      name: 'Low Cargo',
      type: 'line',
      stack: 'teleop',
      lineStyle: { color: '#ff9933' },
      areaStyle: { color: '#ff9933' },
      label: {
        normal: {
          show: true,
          position: 'top'
        }
      },
      data: data.map(datum => label(datum.lowCargo))
    }, {
      name: 'High Cargo',
      type: 'line',
      stack: 'teleop',
      lineStyle: { color: '#ff7a00' },
      areaStyle: { color: '#ff7a00' },
      label: {
        normal: {
          show: true,
          position: 'top'
        }
      },
      data: data.map(datum => label(datum.highCargo))
    }, {
      name: 'Low Panels',
      type: 'line',
      stack: 'teleop',
      lineStyle: { color: '#ffdd59' },
      areaStyle: { color: '#ffdd59' },
      label: {
        normal: {
          show: true,
          position: 'top'
        }
      },
      data: data.map(datum => label(datum.lowPanels))
    }, {
      name: 'High Panels',
      type: 'line',
      stack: 'teleop',
      lineStyle: { color: '#ffd32a' },
      areaStyle: { color: '#ffd32a' },
      label: {
        normal: {
          show: true,
          position: 'top'
        }
      },
      data: data.map(datum => label(datum.highPanels))
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
