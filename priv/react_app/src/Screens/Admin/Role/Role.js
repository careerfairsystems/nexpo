import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isEmpty, isNil, capitalize } from 'lodash/fp';
import NotFound from '../../NotFound';
import HtmlTitle from '../../../Components/HtmlTitle';

/**
 * Responsible for rendering a role. Role id is recieved via url
 */
class Role extends Component {
  componentWillMount() {
    const { id, getRole } = this.props;
    getRole(id);
  }

  render() {
    const { role } = this.props;
    if (isEmpty(role) || isNil(role)) {
      return <NotFound />;
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
  getRole: PropTypes.func.isRequired
};

export default Role;
