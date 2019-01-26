/**
 * Toggles the selected cycle visibility in the statistics
 * Gets cycle id inside the request body
 */
const { Cycle } = require('../db')

module.exports = ({ body }, res) => {
  Cycle.findOne({ where: { id: body.id } })
    .then(cycle => cycle.set('visible'))
}
