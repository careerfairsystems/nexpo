import React, { Component } from 'react';
import { toLower } from 'lodash/fp';
import { Table, Divider, Popconfirm } from 'antd';

import InvisibleLink from '../../../Components/InvisibleLink';
import LoadingSpinner from '../../../Components/LoadingSpinner';
import HtmlTitle from '../../../Components/HtmlTitle';
import FilterSearch, { FilterIcon } from '../../../Components/FilterSearch';

/**
 * Responsible for rendering a list of users
 */
type Props = {
  users?: {},
  fetching: boolean,
  getAllUsers: () => Promise<void>,
  deleteUser: string => Promise<void>
};
class Users extends Component<Props> {
  static defaultProps = {
    users: {}
  };

  componentWillMount() {
    const { getAllUsers } = this.props;
    getAllUsers();
  }

  renderUsers() {
    const { users = {} } = this.props;
    const userColumns = [
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
        filterDropdown: FilterSearch,
        filterIcon: FilterIcon,
        onFilter: (value, user) => toLower(user.email).includes(toLower(value)),
        render: (email, { id }) => (
          <InvisibleLink to={`/admin/users/${id}`}>{email}</InvisibleLink>
        )
      },
      {
        title: 'First Name',
        dataIndex: 'firstName',
        key: 'firstName'
      },
      {
        title: 'Last Name',
        dataIndex: 'lastName',
        key: 'lastName'
      },
      {
        title: 'Action',
        key: 'action',
        render: user => {
          const { deleteUser } = this.props;
          return (
            <span>
              <InvisibleLink to={`/admin/users/${user.id}`}>Show</InvisibleLink>
              <Divider type="vertical" />
              <InvisibleLink to={`/admin/users/${user.id}/edit`}>
                Edit
              </InvisibleLink>
              <Divider type="vertical" />
              <Popconfirm
                title="Sure to delete?"
                onConfirm={() => deleteUser(user.id)}
              >
                <span style={{ color: '#ff4d4f', cursor: 'pointer' }}>
                  Delete
                </span>
              </Popconfirm>
            </span>
          );
        }
      }
    ];

    return (
      <div>
        <HtmlTitle title="Users" />

        <h1>Users</h1>

        <Table
          columns={userColumns}
          dataSource={Object.keys(users).map(i => ({
            ...users[i],
            key: i
          }))}
        />
      </div>
    );
  }

  render() {
    const { fetching } = this.props;

    if (fetching) {
      return <LoadingSpinner />;
    }
    return this.renderUsers();
  }
}

export default Users;
