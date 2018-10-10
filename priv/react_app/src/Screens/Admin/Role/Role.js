import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isEmpty, isNil, capitalize } from 'lodash/fp';
import NotFound from '../../NotFound';
import RoleForm from '../../../Components/Forms/RoleForm.js';
import HtmlTitle from '../../../Components/HtmlTitle';

/**
 * Responsible for rendering a role. Role id is recieved via url
 */
class Role extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false
    };
  }

  componentWillMount() {
    const { id, getRole, location } = this.props;
    if (location && location.hash === '#edit') {
      this.setState({ edit: true });
    }
    getRole(id);
  }

  updateRole = values => {
    const { id, role, createRole, updateRole } = this.props;

    if (isEmpty(role)) {
      createRole({ role: values });
    } else {
      updateRole(id, { role: values });
    }
  };

  renderEditView() {
    const { role } = this.props;
    return (
      <div className="role-edit-view">
        {' '}
        <div>
          <h1>Role</h1>
          <RoleForm onSubmit={this.updateRole} initialValues={role} />
        </div>
      </div>
    );
  }

  render() {
    const { edit } = this.state;
    const { role } = this.props;

    if (isEmpty(role) || isNil(role)) {
      return <NotFound />;
    }
    if (edit) {
      return this.renderEditView();
    }

    const { type, permissions } = role;
    return (
      <div className="Role_Component">
        <HtmlTitle title={capitalize(type)} />

        <div className="left-col">
          <div className="paper main-info">
            <h1>{capitalize(type)}</h1>
            <p>Permissions: {permissions.join(', ')}</p>
          </div>

          {JSON.stringify(role)}
        </div>
      </div>
    );
  }
}

Role.propTypes = {
  id: PropTypes.string.isRequired,
  role: PropTypes.object.isRequired,
  getRole: PropTypes.func.isRequired,
  createRole: PropTypes.func.isRequired,
  updateRole: PropTypes.func.isRequired
};

export default Role;
