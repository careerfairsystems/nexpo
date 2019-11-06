import React, { Component } from 'react';
import { Icon, Upload, Table, Button, Popconfirm, Divider } from 'antd';
import { size, sortBy, toLower } from 'lodash/fp';

import { toExternal } from '../../../Util/URLHelper';
import InvisibleLink from '../../../Components/InvisibleLink';
import LoadingSpinner from '../../../Components/LoadingSpinner';
import HtmlTitle from '../../../Components/HtmlTitle';
import FilterSearch, { FilterIcon } from '../../../Components/FilterSearch';

/**
 * Responsible for rendering a list of companies
 */
type Props = {
  companies?: {},
  fetching: boolean,
  getAllCompanies: () => Promise<void>,
  deleteCompany: string => Promise<void>,
  onChange: (?File) => Promise<void>
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
    const { onChange } = this.props;

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
	<div>
          <InvisibleLink to="companies/new">
            <Button onClick={() => null} type="primary">
              New company
            </Button>
          </InvisibleLink>
          <Upload
            key="uploadButton"
            accept=".csv"
            beforeUpload={file => {
              onChange(file);
              return false;
            }}
          >
          <Button>
	    <Icon type="upload" />
	    Create Bulk
	  </Button>
    </Upload>

	</div>
        <br />
        <br />
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
