/**
 * Toggles the selected cycle visibility in the statistics
 * Gets cycle id inside the request body
 */
const { Cycle } = require('../db')

module.exports = (req, res) => {
  Cycle.findOne({ where: { id: req.body.id } })
    .then(cycle => cycle.set('visible'))
}
