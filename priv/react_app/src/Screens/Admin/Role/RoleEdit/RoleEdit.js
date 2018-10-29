import React, { Component } from 'react';
import { isEmpty, isNil, capitalize } from 'lodash/fp';

import NotFound from '../../../NotFound';
import RoleForm from '../../../../Forms/RoleForm';
import HtmlTitle from '../../../../Components/HtmlTitle';
import LoadingSpinner from '../../../../Components/LoadingSpinner';
import '../Role.css';

/**
 * Responsible for rendering a role. Role id is recieved via url
 */
type Props = {
  id: string,
  role: { type?: string },
  getRole: string => Promise<void>,
  getAllUsers: () => Promise<void>,
  fetchingRoles: boolean,
  fetchingUsers: boolean,
  updateRole: (string, { role: {} }) => Promise<void>,
  history: { push: string => any }
};
class RoleEdit extends Component<Props> {
  componentWillMount() {
    const { id, getRole, getAllUsers } = this.props;
    getRole(id);
    getAllUsers();
  }

  updateRole = (values: {
    type: string,
    permissions: Array<string>,
    user: number
  }) => {
    const { id, updateRole, history } = this.props;
    updateRole(id, { role: values });
    history.push(`/admin/roles/${id}`);
  };

  render() {
    const { role, fetchingRoles, fetchingUsers } = this.props;

    if (fetchingRoles || fetchingUsers) return <LoadingSpinner />;
    if (isEmpty(role) || isNil(role)) return <NotFound />;

    return (
      <div className="role-edit-view">
        <HtmlTitle title={capitalize(role.type || '')} />
        <div>
          <h1>Role: {capitalize(role.type || '')}</h1>
          <RoleForm onSubmit={this.updateRole} initialValues={role} />
        </div>
      </div>
    );
  }
}

export default RoleEdit;
