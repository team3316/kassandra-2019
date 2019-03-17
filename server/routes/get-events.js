const { sequelize } = require('../db')

module.exports = (req, res) =>
  /**
   * Get all event keys from the database
   *
   * The query returns the list of matches in the database
   * The server returns a list of events without repeating events
   */
  sequelize.query(`select match_key AS "matchKey" from ${process.env.DB_SCHEMA != null ? `${process.env.DB_SCHEMA}.` : ''}cycles;`)
    .then(data => {
      /**
       * Extract list of unique events from matchKey list
       */
      let events = data[0].map(({ matchKey }) => matchKey.replace(/_.*/, ''))
      events = events.filter((event, index) => events.indexOf(event) === index)
      res.json(events)
    })
