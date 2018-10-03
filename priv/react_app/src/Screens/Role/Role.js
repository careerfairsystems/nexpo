import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isEmpty, isNil, capitalize } from 'lodash/fp';
import NotFound from '../NotFound';
import HtmlTitle from '../../Components/HtmlTitle';

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
    if (location && location.hash === '#role-edit') {
      this.setState({ edit: true });
    }
    getRole(id);
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

  renderEditView() {
    const { role } = this.props;
    return <div className="role-edit-view">/*TODO*/</div>;
  }
}

Role.propTypes = {
  id: PropTypes.string.isRequired,
  role: PropTypes.object.isRequired,
  getRole: PropTypes.func.isRequired
};

export default Role;
