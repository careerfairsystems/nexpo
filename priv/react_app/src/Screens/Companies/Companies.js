import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Table from 'antd/lib/table';
import Button from 'antd/lib/button';
import Divider from 'antd/lib/divider';
import InvisibleLink from '../../Components/InvisibleLink';
import LoadingSpinner from '../../Components/LoadingSpinner';
import HtmlTitle from '../../Components/HtmlTitle';
import './Companies.css';

const companyColumns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (name, { id }) => (
      <InvisibleLink to={`/companies/${id}`}>{name}</InvisibleLink>
    )
  },
  {
    title: 'Website',
    dataIndex: 'website',
    key: 'website'
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description'
  },
  {
    title: 'Action',
    key: 'action',
    render: company => (
      <span>
        <InvisibleLink to={`/companies/${company.id}`}>Show</InvisibleLink>
        <Divider type="vertical" />
        <InvisibleLink to={`/companies/${company.id}`}>Edit</InvisibleLink>
        <Divider type="vertical" />
        <InvisibleLink to="#company-delete">Delete</InvisibleLink>
      </span>
    )
  }
];

/**
 * Responsible for rendering a list of companies
 */
class Companies extends Component {
  componentWillMount() {
    const { getAllCompanies } = this.props;
    getAllCompanies();
  }

  renderCompanies() {
    const { companies } = this.props;

    return (
      <div>
        <HtmlTitle title="Companies" />

        <h1>Companies</h1>

        <Table
          columns={companyColumns}
          dataSource={Object.keys(companies).map(i => ({
            ...companies[i],
            key: i
          }))}
        />
        <InvisibleLink to="/companies/new">
          <Button onClick={() => null} type="primary">
            New company
          </Button>
        </InvisibleLink>
      </div>
    );
  }

  render() {
    if (this.props.fetching) {
      return <LoadingSpinner />;
    }
    return this.renderCompanies();
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
