import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

const district = '2018isr'

const blueAlliance = axios.create({
  baseURL: 'https://www.thebluealliance.com/api/v3',
  headers: { 'X-TBA-Auth-Key': process.env.TBA_AUTH }
})

blueAlliance.get(`/district/${district}/events/key`)
  .then(res => res.data)
  .then(data => console.log(data))
  .catch(err => console.error(err))

class MatchTable extends Component {
  render () {
    return (
      <select>
        <option>ICMP2018</option>
      </select>
    )
  }   
}

class SearchBar extends Component {

}

class MatchListPage extends Component {
  render () {
    return (
      <MatchTable />
    )
  }
}

ReactDOM.render(<MatchListPage />, document.querySelector('#root'))
