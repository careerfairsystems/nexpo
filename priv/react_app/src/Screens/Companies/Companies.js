import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table';
import InvisibleLink from '../../Components/InvisibleLink';
import LoadingSpinner from '../../Components/LoadingSpinner';
import HtmlTitle from '../../Components/HtmlTitle';
import './Companies.css';

/**
 * Responsible for rendering a list of companies
 */
class Companies extends Component {
  componentWillMount() {
    this.props.getAllCompanies();
  }

  _renderTableHeader() {
    return (
      <TableHeader>
        <TableRow>
          <TableHeaderColumn>Name</TableHeaderColumn>
          <TableHeaderColumn>Email</TableHeaderColumn>
        </TableRow>
      </TableHeader>
    );
  }

  _renderTableRow(company) {
    return (
      <TableRow key={company.id}>
        <TableRowColumn>
          <InvisibleLink to={`/companies/${company.id}`}>
            {company.name}
          </InvisibleLink>
        </TableRowColumn>
        <TableRowColumn>{company.email}</TableRowColumn>
      </TableRow>
    );
  }

  _renderLoading() {
    return (
      <div className="loading-spinner">
        <LoadingSpinner />
      </div>
    );
  }

  _renderCompanies() {
    return (
      <div>
        <HtmlTitle title="Companies" />

        <Table>
          {this._renderTableHeader()}
          <TableBody>
            {Object.keys(this.props.companies).map(key =>
              this._renderTableRow(this.props.companies[key])
            )}
          </TableBody>
        </Table>
      </div>
    );
  }

  render() {
    if (this.props.fetching) {
      return this._renderLoading();
    }
    return this._renderCompanies();
  }
}

Companies.propTypes = {
  companies: PropTypes.object.isRequired,
  fetching: PropTypes.bool.isRequired,
  getAllCompanies: PropTypes.func.isRequired
};

Companies.defaultProps = {
  companies: {},
  fetching: false
};

export default Companies;
