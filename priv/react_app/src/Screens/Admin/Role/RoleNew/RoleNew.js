import React, { Component } from 'react';

import RoleForm from '../../../../Forms/RoleForm';
import '../Role.css';

/**
 * Responsible for rendering a role. Role id is recieved via url
 */
type Props = {
  createRole: () => Promise<any>,
  getAllUsers: () => Promise<any>
};
class RoleNew extends Component<Props> {
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
