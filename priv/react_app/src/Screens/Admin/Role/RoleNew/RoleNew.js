import React, { Component } from 'react';
import PropTypes from 'prop-types';

import RoleForm from '../../../../Forms/RoleForm';
import '../Role.css';

/**
 * Responsible for rendering a role. Role id is recieved via url
 */
class RoleNew extends Component {
  static propTypes = {
    createRole: PropTypes.func.isRequired,
    getAllUsers: PropTypes.func.isRequired
  };

  componentWillMount() {
    const { getAllUsers } = this.props;
    getAllUsers();
  }

  createRole = values => {
    const { createRole } = this.props;
    createRole({ role: values });
  };

  render() {
    return (
      <div className="role-new-view">
        <RoleForm onSubmit={this.createRole} />
      </div>
    );
  }
}

export default RoleNew;
