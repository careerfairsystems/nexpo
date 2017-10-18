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
import InvisibleLink from '../../Components/InvisibleLink';
import LoadingSpinner from '../../Components/LoadingSpinner';
import { Helmet } from "react-helmet";

/**
 * Responsible for rendering a list of companies
 */
class Companies extends Component {

  _renderTableHeader() {
    return (
      <TableHeader>
        <TableRow>
          <TableHeaderColumn>Name</TableHeaderColumn>
          <TableHeaderColumn>Email</TableHeaderColumn>
        </TableRow>
      </TableHeader>
    )
  }

  _renderTableRow(company) {
    return (
      <TableRow key={company.id}>
        <TableRowColumn>
          <InvisibleLink to={`/companies/${company.id}`}>{company.name}</InvisibleLink>
        </TableRowColumn>
        <TableRowColumn>{company.email}</TableRowColumn>
      </TableRow>
    )
  }

  _renderLoading() {
    return (
      <div>
        <LoadingSpinner />
      </ div>
    )
  }

  _renderCompanies() {
    return (
      <div>
        <Helmet>
          <title>Nexpo | Companies</title>
        </Helmet>
        <Table>
          {this._renderTableHeader()}
          <TableBody>
            {this.props.companies.map(c => this._renderTableRow(c))}
          </TableBody>
        </Table>
      </div>
      )
  }


  render() {
    if(this.props.fetching) {
      return (
        this._renderLoading()
      )
    } else {
      return (
        this._renderCompanies()
      )
    }
  }
}

Companies.propTypes = {
  companies: PropTypes.array,
  fetching: PropTypes.bool
}

Companies.defaultProps = {
  companies: [],
  fetching: false
}

export default Companies
