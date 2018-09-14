import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Table from 'antd/lib/table';
import Button from 'antd/lib/button';
import Divider from 'antd/lib/divider';
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

  _renderLoading() {
    return (
      <div className="loading-spinner">
        <LoadingSpinner />
      </div>
    );
  }

  _renderCompanies() {
    const { companies } = this.props;

    const columns = [
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
        render: ({ id }) => (
          <span>
            <InvisibleLink to={`/companies/${id}`}>Show</InvisibleLink>
            <Divider type="vertical" />
            <InvisibleLink to="#">Edit</InvisibleLink>
            <Divider type="vertical" />
            <InvisibleLink to="#">Delete</InvisibleLink>
          </span>
        )
      }
    ];

    return (
      <div>
        <HtmlTitle title="Companies" />

        <Table
          dataSource={Object.values(companies).map(i => ({ ...i, key: i.id }))}
          columns={columns}
        />

        <Button onClick={() => console.log('New company')} type="primary">
          New company
        </Button>
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
