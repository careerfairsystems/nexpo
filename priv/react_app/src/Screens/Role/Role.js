import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isEmpty, isNil } from 'lodash/fp';
import NotFound from '../NotFound';
import HtmlTitle from '../../Components/HtmlTitle';

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

    const { name, website, description } = role;
    return (
      <div className="Role_Component">
        <HtmlTitle title={name} />

        <div className="left-col">
          <div className="paper main-info">
            <h1>{name}</h1>
            <a href={website}>{website}</a>
            <p>{description}</p>
          </div>

          <div className="paper entries">
            <h2>Entries</h2>
          </div>
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
