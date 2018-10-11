import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isEmpty, isNil, capitalize } from 'lodash/fp';
import NotFound from '../../../NotFound';
import HtmlTitle from '../../../../Components/HtmlTitle';
import InvisibleLink from '../../../../Components/InvisibleLink';

/**
 * Responsible for rendering a role. Role id is recieved via url
 */
class RoleShow extends Component {
  componentWillMount() {
    const { id, getRole } = this.props;
    getRole(id);
  }

  render() {
    const { role } = this.props;

    if (isEmpty(role) || isNil(role)) {
      return <NotFound />;
    }

    return (
      <div className="role-show-view">
        <HtmlTitle title={capitalize(role.type)} />

        <div>
          <h1>{capitalize(role.type)}</h1>
          <p>Permissions: {role.permissions.join(', ')}</p>
        </div>

        <InvisibleLink to={`/admin/roles/${role.id}/edit`}>Edit</InvisibleLink>
      </div>
    );
  }
}

RoleShow.propTypes = {
  id: PropTypes.string.isRequired,
  role: PropTypes.object.isRequired,
  getRole: PropTypes.func.isRequired
};

export default RoleShow;
