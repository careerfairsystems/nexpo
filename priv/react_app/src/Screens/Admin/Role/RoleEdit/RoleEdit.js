import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isEmpty, isNil, capitalize } from 'lodash/fp';

import NotFound from '../../../NotFound';
import RoleForm from '../../../../Components/Forms/RoleForm';
import HtmlTitle from '../../../../Components/HtmlTitle';
import LoadingSpinner from '../../../../Components/LoadingSpinner';

/**
 * Responsible for rendering a role. Role id is recieved via url
 */
class RoleEdit extends Component {
  componentWillMount() {
    const { id, getRole } = this.props;
    getRole(id);
  }

  updateRole = values => {
    const { id, updateRole, history } = this.props;
    updateRole(id, { role: values });
    history.push(`/admin/roles/${id}`);
  };

  render() {
    const { role, fetching } = this.props;

    if (fetching) return <LoadingSpinner />;
    if (isEmpty(role) || isNil(role)) return <NotFound />;

    return (
      <div className="role-edit-view">
        <HtmlTitle title={capitalize(role.type)} />
        <div>
          <h1>Role: {capitalize(role.type)}</h1>
          <RoleForm onSubmit={this.updateRole} initialValues={role} />
        </div>
      </div>
    );
  }
}

RoleEdit.propTypes = {
  id: PropTypes.string.isRequired,
  role: PropTypes.shape({ type: PropTypes.string }).isRequired,
  getRole: PropTypes.func.isRequired,
  fetching: PropTypes.bool.isRequired,
  updateRole: PropTypes.func.isRequired,
  history: PropTypes.shape({ push: PropTypes.func }).isRequired
};

export default RoleEdit;
