/**
 * Toggles the selected cycle visibility in the statistics
 * Gets cycle id inside the request body
 */
const { Cycle } = require('../db')

/**
 * Gets cycle id in the request body, returns what visibility state the cycle was changed to
 * @return {Object}
 * An object with a visible field that describes what the visibility was changed to
 */
module.exports = ({ body }, res) => {
  Cycle.findOne({
    where: { id: body.id }
  })
    .then(cycle => {
      cycle.set('visible', !cycle.get('visible'))
      cycle.save()
      res.json({ visible: cycle.get('visible') })
    })
}
