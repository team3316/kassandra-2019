/**
 * Toggles the selected cycle visibility in the statistics
 * Gets cycle id inside the request body
 */
const { Cycle } = require('../db')

module.exports = ({ body }, res) => {
  Cycle.findOne({
    where: { id: body.id }
  })
    .then(cycle => {
      console.log('==> Visibility state: ' + cycle.visible)
      console.log('==> Cycle: ' + JSON.stringify(cycle, null, 2))
      cycle.set('visible', !cycle.get('visible'))
      console.log('==> Cycle: ' + JSON.stringify(cycle, null, 2))
      cycle.save()
    })

  res.status(200)
}
