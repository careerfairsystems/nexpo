import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Table, Input, Button, Icon } from 'antd';
import { size, sortBy } from 'lodash/fp';
import Popconfirm from 'antd/lib/popconfirm';
import Divider from 'antd/lib/divider';
import { toExternal } from '../../Util/URLHelper';
import InvisibleLink from '../../Components/InvisibleLink';
import LoadingSpinner from '../../Components/LoadingSpinner';
import HtmlTitle from '../../Components/HtmlTitle';
import './Companies.css';

/**
 * Responsible for rendering a list of companies
 */
class Companies extends Component {
  componentWillMount() {
    const { getAllCompanies } = this.props;
    getAllCompanies();
  }

  handleSearch = (selectedKeys, confirm) => () => {
    confirm();
    this.setState({ searchText: selectedKeys[0] });
  };

  handleReset = clearFilters => () => {
    clearFilters();
    this.setState({ searchText: '' });
  };

  companyColumns = () => [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters
      }) => (
        <div className="custom-filter-dropdown">
          <Input
            ref={ele => (this.searchInput = ele)}
            placeholder="Search by company name"
            value={selectedKeys[0]}
            onChange={e =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={this.handleSearch(selectedKeys, confirm)}
          />
          <Button
            type="primary"
            onClick={this.handleSearch(selectedKeys, confirm)}
          >
            Search
          </Button>
          <Button onClick={this.handleReset(clearFilters)}>Reset</Button>
        </div>
      ),
      filterIcon: filtered => (
        <Icon type="search" style={{ color: filtered ? '#108ee9' : '#aaa' }} />
      ),
      onFilter: (value, record) =>
        record.name.toLowerCase().includes(value.toLowerCase()),
      onFilterDropdownVisibleChange: visible => {
        if (visible) {
          setTimeout(() => {
            this.searchInput.focus();
          });
        }
      },
      render: (name, { id }) => (
        <InvisibleLink to={`/companies/${id}`}>{name}</InvisibleLink>
      )
    },
    {
      title: 'Website',
      dataIndex: 'website',
      key: 'website',
      render: website => <a href={toExternal(website)}>{website}</a>
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      render: description =>
        size(description) > 42 ? `${description.slice(0, 42)} ...` : description
    },
    {
      title: 'Action',
      key: 'action',
      render: company => (
        <span>
          <InvisibleLink to={`/companies/${company.id}`}>Show</InvisibleLink>
          <Divider type="vertical" />
          <InvisibleLink to={`/companies/${company.id}#edit`}>
            Edit
          </InvisibleLink>
          <Divider type="vertical" />
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => this.props.deleteCompany(company.id)}
          >
            <span style={{ color: '#ff4d4f', cursor: 'pointer' }}>Delete</span>
          </Popconfirm>
        </span>
      )
    }
  ];

  renderCompanies() {
    const { companies } = this.props;

    return (
      <div>
        <HtmlTitle title="Companies" />

        <h1>Companies</h1>

        <Table
          columns={this.companyColumns()}
          dataSource={sortBy('name', Object.keys(companies).map(i => ({
            ...companies[i],
            key: i
          })))}
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
