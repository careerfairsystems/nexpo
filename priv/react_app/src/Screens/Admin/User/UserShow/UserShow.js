import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { isEmpty, isNil, map } from 'lodash/fp';
import HtmlTitle from '../../../../Components/HtmlTitle';
import LoadingSpinner from '../../../../Components/LoadingSpinner';
import InvisibleLink from '../../../../Components/InvisibleLink';

import NotFound from '../../../NotFound';
import '../User.css';

/**
 * Responsible for rendering a user. User id is recieved via url
 */
class UserShow extends Component {
  componentWillMount() {
    const { id, getUser } = this.props;
    getUser(id);
  }

  displayName = () => {
    const {
      user: { email, firstName, lastName }
    } = this.props;
    return firstName ? [firstName, lastName].join(' ') : email;
  };

  roles = () => {
    const {
      user: { roles }
    } = this.props;
    return isEmpty(roles) ? 'None' : map('type', roles).join(', ');
  };

  render() {
    const { user, fetching } = this.props;

    if (fetching) return <LoadingSpinner />;
    if (isEmpty(user) || isNil(user)) return <NotFound />;

    return (
      <div className="user-show-view">
        <HtmlTitle title={this.displayName()} />

        <div>
          <h1>{this.displayName()}</h1>
          <p>Email: {user.email}</p>
          <p>Phone number: {user.phoneNumber}</p>
          <p>Roles: {this.roles()}</p>
          <p>Food Preferences: {user.foodPreferences}</p>
        </div>
        <InvisibleLink to={`/admin/users/${user.id}/edit`}>Edit</InvisibleLink>
      </div>
    );
  }
}

UserShow.defaultProps = {
  id: null,
  match: {
    path: ''
  }
};
UserShow.propTypes = {
  id: PropTypes.string,
  user: PropTypes.object.isRequired,
  fetching: PropTypes.bool.isRequired,
  getUser: PropTypes.func.isRequired,
  match: PropTypes.shape({
    path: PropTypes.string
  })
};

export default UserShow;
