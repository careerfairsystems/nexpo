import React, { Component } from 'react';
import PropTypes from 'prop-types'

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import InvisibleLink from '../../Components/InvisibleLink'
import { Helmet } from "react-helmet";

/**
 * Responsible for rendering a list of companies
 */
class Companies extends Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>Nexpo | Companies</title>
        </Helmet>

        <Table>

          <TableHeader>
            <TableRow>
              <TableHeaderColumn>Name</TableHeaderColumn>
              <TableHeaderColumn>Email</TableHeaderColumn>
            </TableRow>
          </TableHeader>

          <TableBody>

            {this.props.companies.map(c => {
              return (
                  <TableRow key={c.id}>
                    <TableRowColumn>
                      <InvisibleLink to={`/companies/${c.id}`}>{c.name}</InvisibleLink>
                    </TableRowColumn>
                    <TableRowColumn>{c.email}</TableRowColumn>
                  </TableRow>
              )
            })}
          </TableBody>

        </Table>
      </div>
    )
  }
}

Companies.propTypes = {
  companies: PropTypes.array
}

Companies.defaultProps = {
  companies: []
}

export default Companies
