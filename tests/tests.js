const gameObject = {
  cargoShip: 3,
  level1: 2,
  level2: 2,
  level3: 3
}

for (let i = 1; i <= 60; i++) {
  fetch('http://localhost:3000/cycles', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      teamNumber: 3316,
      matchKey: `2019test_pm${i}`,
      sandstorm: {
        habLine: true,
        cargoToCargoShip: true,
        cargoToRocket: true,
        panelToCargoShip: true,
        panelToRocket: true
      },
      teleop: {
        cargo: gameObject,
        panels: gameObject
      },
      climb: 'level3',
      comment: 'gay 1',
      defence: {
        state: 'defended',
        comment: 'gayyyyyyy defence',
        offender: 0
      }
    })
  })
}
