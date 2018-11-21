import React, { Component } from 'react';
import { Table, Button, Popconfirm, Divider } from 'antd';
import { size, sortBy, toLower, isEmpty, isNil } from 'lodash/fp';
import NotFound from '../../NotFound';
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
  deleteCompany: string => Promise<void>,
  createBulkStudentSessions: ({}) => Promise<void>,
  company: {
    id?: string,
    name?: string,
    website?: string,
    description?: string,
    logoUrl?: string,

    studentSessionDays?: number,
    studentSessionApplications?: Array<*>,
    studentSessionTimeSlots?: Array<{
      id: number,
      start: string,
      end: string,
      location: string,
      studentSession: {
        student: {
          user: {
            firstName?: string,
            lastName?: string,
            email?: string,
            phoneNumber?: string
          }
        }
      }
    }>,
    topStudents?: Array<{ id: number, firstName: string, lastName: string }>
  }
};
class StudentSession extends Component<Props> {
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
    const { fetching } = this.props;

    if (fetching) return <LoadingSpinner />;
    return (
      <div>
        <HtmlTitle title="Student Session" />

        <h1>Student Session</h1>
        <div>
          <Popconfirm
            title="Sure to assign empty and non-confirmed time slots?"
            onConfirm={() => {
              const { createBulkStudentSessions } = this.props;
              createBulkStudentSessions();
            }}
          >
            <Button onClick={() => null} type="primary">
              Assign all
            </Button>
          </Popconfirm>
        </div>
        <Popconfirm
          title="Sure to delete all non confirmed student sessions?"
          onConfirm={API.studentSessions.deleteNonConfirmed}
        >
          <Button onClick={() => null}>Remove non-confirmed sessions</Button>
        </Popconfirm>
        <br />
        <Button icon="download" onClick={API.studentSessions.downloadReserves}>
          Download reserves
        </Button>
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

export default StudentSession;
