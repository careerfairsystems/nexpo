import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Table from 'antd/lib/table';
import Button from 'antd/lib/button';
import Divider from 'antd/lib/divider';
import InvisibleLink from '../../Components/InvisibleLink';
import LoadingSpinner from '../../Components/LoadingSpinner';
import HtmlTitle from '../../Components/HtmlTitle';

const userColumns = [
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
    render: (email, { id }) => (
      <InvisibleLink to={`/users/${id}`}>{email}</InvisibleLink>
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
    render: user => (
      <span>
        <InvisibleLink to={`/users/${user.id}`}>Show</InvisibleLink>
        <Divider type="vertical" />
        <InvisibleLink to="#user-edit">Edit</InvisibleLink>
        <Divider type="vertical" />
        <InvisibleLink to="#user-delete">Delete</InvisibleLink>
      </span>
    )
  }
];

/**
 * Responsible for rendering a list of users
 */
class Users extends Component {
  componentWillMount() {
    const { getAllUsers } = this.props;
    getAllUsers();
  }

  renderUsers() {
    const { users } = this.props;

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

        <Button onClick={() => null} type="primary">
          New user
        </Button>
      </div>
    );
  }

  render() {
    if (this.props.fetching) {
      return <LoadingSpinner />;
    }
    return this.renderUsers();
  }
}

Users.propTypes = {
  users: PropTypes.object.isRequired,
  fetching: PropTypes.bool.isRequired,
  getAllUsers: PropTypes.func.isRequired
};

Users.defaultProps = {
  users: {},
  fetching: false
};

export default Users;
