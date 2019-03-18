const { sequelize } = require('../db')

const getTeamsByEvent = ({ params }, res) =>
  sequelize.query(`SELECT team_number AS "teamNumber"
  FROM ${process.env.DB_SCHEMA != null ? `${process.env.DB_SCHEMA}.` : ''}cycles
  WHERE match_key ~ '${params.eventKey}' GROUP BY team_number;`)
    .then(data => res.json(data[0].map(({ teamNumber }) => teamNumber)))

module.exports = {
  getTeamsByEvent
}
