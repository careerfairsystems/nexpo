import React, { Component } from 'react';
import { sortBy } from 'lodash/fp';
import { Popconfirm, Table, Button, Divider } from 'antd';

import InvisibleLink from '../../../Components/InvisibleLink';
import LoadingSpinner from '../../../Components/LoadingSpinner';
import HtmlTitle from '../../../Components/HtmlTitle';

/**
 * Responsible for rendering a list of roles
 */
type Props = {
  roles: {},
  fetching: boolean,
  getAllRoles: () => Promise<void>,
  deleteRole: string => Promise<void>
};
class Roles extends Component<Props> {
  componentWillMount() {
    const { getAllRoles } = this.props;
    getAllRoles();
  }

  roleColumns = () => [
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (type: string, { id }: { id: string }) => (
        <InvisibleLink to={`/admin/roles/${id}`}>{type}</InvisibleLink>
      )
    },
    {
      title: 'Permissions',
      dataIndex: 'permissions',
      key: 'permissions',
      render: (permissions: Array<string>) => (
        <span>{permissions.join(', ')}</span>
      )
    },
    {
      title: 'Action',
      key: 'action',
      render: (role: { id: string }) => (
        <span>
          <InvisibleLink to={`/admin/roles/${role.id}`}>Show</InvisibleLink>
          <Divider type="vertical" />
          <InvisibleLink to={`/admin/roles/${role.id}/edit`}>
            Edit
          </InvisibleLink>
          <Divider type="vertical" />
          <Popconfirm
            title="Are you sure you want to delete this role?"
            onConfirm={() => this.deleteRole(role.id)}
          >
            <span style={{ color: '#ff4d4f', cursor: 'pointer' }}>Delete</span>
          </Popconfirm>
        </span>
      )
    }
  ];

  deleteRole = (id: string) => {
    const { deleteRole } = this.props;
    deleteRole(id);
  };

  render() {
    const { roles, fetching } = this.props;
    if (fetching) return <LoadingSpinner />;

    return (
      <div>
        <HtmlTitle title="Roles" />
        <h1>Roles</h1>
        <Table
          columns={this.roleColumns()}
          dataSource={sortBy(
            'type',
            Object.keys(roles).map(i => ({
              ...roles[i],
              key: i
            }))
          )}
        />
        <InvisibleLink to="/admin/roles/new">
          <Button onClick={() => null} type="primary">
            New role
          </Button>
        </InvisibleLink>
      </div>
    );
  }
}

export default Roles;
