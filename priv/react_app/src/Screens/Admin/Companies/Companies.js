import React, { Component } from 'react';
import { Table, Button, Popconfirm, Divider } from 'antd';
import { size, sortBy, toLower } from 'lodash/fp';

import { toExternal } from '../../../Util/URLHelper';
import InvisibleLink from '../../../Components/InvisibleLink';
import LoadingSpinner from '../../../Components/LoadingSpinner';
import HtmlTitle from '../../../Components/HtmlTitle';
import FilterSearch, { FilterIcon } from '../../../Components/FilterSearch';

import API from '../../../API';

/**
 * Responsible for rendering a list of companies
 */
type Props = {
  companies?: {},
  fetching: boolean,
  getAllCompanies: () => Promise<void>,
  deleteCompany: string => Promise<void>
};
class Companies extends Component<Props> {
  static defaultProps = {
    companies: {}
  };

  componentWillMount() {
    const { getAllCompanies } = this.props;
    getAllCompanies();
  }

  companyColumns = () => [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      filterDropdown: FilterSearch,
      filterIcon: FilterIcon,
      onFilter: (value: string, record: { name: string }) =>
        toLower(record.name).includes(toLower(value)),
      render: (name: string, { id }: { id: string }) => (
        <InvisibleLink to={`/admin/companies/${id}`}>{name}</InvisibleLink>
      )
    },
    {
      title: 'Website',
      dataIndex: 'website',
      key: 'website',
      render: (website: string) => <a href={toExternal(website)}>{website}</a>
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      render: (description: string) =>
        size(description) > 42 ? `${description.slice(0, 42)} ...` : description
    },
    {
      title: 'Action',
      key: 'action',
      render: (company: { id: string }) => (
        <span>
          <InvisibleLink to={`/admin/companies/${company.id}`}>
            Show
          </InvisibleLink>
          <Divider type="vertical" />
          <InvisibleLink to={`/admin/companies/${company.id}/edit`}>
            Edit
          </InvisibleLink>
          <Divider type="vertical" />
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => {
              const { deleteCompany } = this.props;
              deleteCompany(company.id);
            }}
          >
            <span style={{ color: '#ff4d4f', cursor: 'pointer' }}>Delete</span>
          </Popconfirm>
        </span>
      )
    }
  ];

  renderCompanies() {
    const { companies = {} } = this.props;

    return (
      <div>
        <HtmlTitle title="Companies" />

        <h1>Companies</h1>

        <Table
          columns={this.companyColumns()}
          dataSource={sortBy(
            'name',
            Object.keys(companies).map(i => ({
              ...companies[i],
              key: i
            }))
          )}
        />
        <InvisibleLink to="companies/new">
          <Button onClick={() => null} type="primary">
            New company
          </Button>
        </InvisibleLink>
        <br />
        <br />
        <Popconfirm
          title="Sure to delete all non confirmed student sessions?"
          onConfirm={API.studentSessions.deleteNonConfirmed}
        >
          <Button onClick={() => null}>Remove non-confirmed sessions</Button>
        </Popconfirm>
      </div>
    );
  }

  render() {
    const { fetching } = this.props;

    if (fetching) {
      return <LoadingSpinner />;
    }
    return this.renderCompanies();
  }
}

export default Companies;
