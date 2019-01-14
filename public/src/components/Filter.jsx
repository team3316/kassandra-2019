import React, { Component } from 'react'

/**
 * Gets eventList JSON as a prop from the blue alliance
 */
export default class Filter extends Component {
  render () {
    const eventArray = []
    const eventList = this.props.eventList
    let districtName

    for (let i in eventList) {
      // TODO: remove annoying "**See site for more information**"
      districtName = eventList[i].name
      eventArray.push(<option key={i}> {districtName} </option>)
    }

    eventArray.sort()

    return (
      <div>
        <p>aaaaa</p>
        <select>
          {eventArray}
        </select>
      </div>
    )
  }
}
