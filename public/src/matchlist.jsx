const districtKey = process.env.DISTRICT_KEY

const selectEvents = state => state.events.eventList
const selectFetchStatus = state => state.events.isFetching
const selectDistrictKey = state => state.tbaApi.districtKey

const blueAlliance = axios.create({
  baseURL: 'https://www.thebluealliance.com/api/v3',
  headers: { 'X-TBA-Auth-Key': process.env.TBA_AUTH }
})

store.subscribe(() => {
  const events = selectEvents(store.getState())
  const isFetching = selectFetchStatus(store.getState())
  const district = selectDistrictKey(store.getState())

  if (events.length === 0 && !isFetching) {
    return store.dispatch(request())
  }

  if (events.length === 0 && isFetching) {
    return blueAlliance.get(`/district/${district}/events`)
      .then(({ data }) =>
        store.dispatch(recieve(data))
      )
  }

  if (events.length > 0) {
    console.log(events)
  }
})

render(
  <Provider store={store} >
    <Container districtKey={districtKey} />
  </Provider>,
  document.querySelector('#root'))
