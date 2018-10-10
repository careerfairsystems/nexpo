import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Table from 'antd/lib/table';
import Button from 'antd/lib/button';
import Divider from 'antd/lib/divider';
import InvisibleLink from '../../../Components/InvisibleLink';
import LoadingSpinner from '../../../Components/LoadingSpinner';
import HtmlTitle from '../../../Components/HtmlTitle';

const roleColumns = [
  {
    title: 'Type',
    dataIndex: 'type',
    key: 'type',
    render: (type, { id }) => (
      <InvisibleLink to={`/admin/roles/${id}`}>{type}</InvisibleLink>
    )
  },
  {
    title: 'Permissions',
    dataIndex: 'permissions',
    key: 'permissions',
    render: permissions => <span>{permissions.join(', ')}</span>
  },
  {
    title: 'Action',
    key: 'action',
    render: role => (
      <span>
        <InvisibleLink to={`/admin/roles/${role.id}`}>Show</InvisibleLink>
        <Divider type="vertical" />
        <InvisibleLink to={`/roles/${role.id}/#role-edit`}>Edit</InvisibleLink>
        <Divider type="vertical" />
        <InvisibleLink to="#role-delete">Delete</InvisibleLink>
      </span>
    )
  }
];

/**
 * Responsible for rendering a list of roles
 */
class Roles extends Component {
  componentWillMount() {
    const { getAllRoles } = this.props;
    getAllRoles();
  }

  renderRoles() {
    const { roles } = this.props;

    return (
      <div>
        <HtmlTitle title="Roles" />

        <h1>Roles</h1>

        <Table
          columns={roleColumns}
          dataSource={Object.keys(roles).map(i => ({
            ...roles[i],
            key: i
          }))}
        />

        <Button onClick={() => null} type="primary">
          New role
        </Button>
      </div>
    );
  }

  render() {
    if (this.props.fetching) {
      return <LoadingSpinner />;
    }
    return this.renderRoles();
  }
}

Roles.propTypes = {
  roles: PropTypes.object.isRequired,
  fetching: PropTypes.bool.isRequired,
  getAllRoles: PropTypes.func.isRequired
};

Roles.defaultProps = {
  roles: {},
  fetching: false
};

export default Roles;
