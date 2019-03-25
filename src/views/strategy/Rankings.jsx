import React from 'react'
import PropTypes from 'prop-types'
import { DataTable } from 'carbon-components-react'
const { Table, TableHead, TableHeader, TableBody, TableCell, TableRow } = DataTable

class Rankings extends React.Component {
  componentDidMount () {
    this.props.getRankings(this.props.event)
  }

  render () {
    const { rankings } = this.props

    return (
      <DataTable
        headers={[{
          key: 'team_number',
          header: 'Team number'
        }, {
          key: 'number_of_matches',
          header: 'Matches played'
        }, {
          key: 'average_cargo_per_game',
          header: 'Average cargo'
        }, {
          key: 'average_panels_per_game',
          header: 'Average panels'
        }, {
          key: 'climb_score_average',
          header: 'Average climb score'
        }]}
        rows={rankings}
        render={({ rows, headers, getHeaderProps }) =>
          <Table>
            <TableHead>
              <TableRow>
                {headers.map(header =>
                  <TableHeader {...getHeaderProps({ header })}>
                    {header.header}
                  </TableHeader>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(row =>
                <TableRow key={row.id}>
                  {row.cells.map(cell =>
                    <TableCell key={cell.id}>{cell.value}</TableCell>)}
                </TableRow>
              )}
            </TableBody>
          </Table>
        }
      />
    )
  }
}

Rankings.propTypes = {
  rankings: PropTypes.array.isRequired,
  event: PropTypes.string.isRequired,
  getRankings: PropTypes.func.isRequired
}

export default Rankings
