import axios from 'axios'

/**
 * Blue Alliance axios instance
 */

/**
 * Actions
 */

export const request = districtKey => ({
  type: 'REQUEST_EVENTS',
  districtKey
})

/**
 * Recieves event list of the specified district
 * @param  {Object} events List of events
 * @return {Object}        State
 */
export const recieve = (districtKey, events) => ({
  type: 'RECIEVE_EVENTS',
  events
})

/** Gets district events and makes a get request */
export const getEvents = districtKey => ({
  type: 'FETCH_EVENTS',
  districtKey
})
