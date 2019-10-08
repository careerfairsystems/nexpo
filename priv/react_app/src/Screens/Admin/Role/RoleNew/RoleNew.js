import React, { Component } from 'react';

import RoleForm from '../../../../Forms/RoleForm';
import '../Role.css';

/**
 * Responsible for rendering a role. Role id is recieved via url
 */
type RoleObj = {
  type: string,
  permissions: Array<string>,
  user?: number
};
type Props = {
  createRole: ({ role: RoleObj }) => Promise<void>,
  getAllUsers: () => Promise<void>
};
class RoleNew extends Component<Props> {
  componentWillMount() {
    const { getAllUsers } = this.props;
    getAllUsers();
  }

  createRole = (values: RoleObj) => {
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
