import React, { Component } from 'react';
import PropTypes from 'prop-types';

import RoleForm from '../../../../Forms/RoleForm';
import '../Role.css';

/**
 * Responsible for rendering a role. Role id is recieved via url
 */
class RoleNew extends Component {
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

RoleNew.propTypes = {
  createRole: PropTypes.func.isRequired
};

export default RoleNew;
