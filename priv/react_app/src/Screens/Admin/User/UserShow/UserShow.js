import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { isEmpty, isNil, map } from 'lodash/fp';
import HtmlTitle from '../../../../Components/HtmlTitle';
import LoadingSpinner from '../../../../Components/LoadingSpinner';
import InvisibleLink from '../../../../Components/InvisibleLink';

import NotFound from '../../../NotFound';

/**
 * Responsible for rendering a user. User id is recieved via url
 */
class UserShow extends Component {
  componentWillMount() {
    const { id, getUser } = this.props;
    getUser(id);
  }

  render() {
    const { user, fetching } = this.props;
    const {
      firstName,
      lastName,
      foodPreferences,
      email,
      phoneNumber,
      roles,
      id
    } = user;
    const displayName = firstName ? [firstName, lastName].join(' ') : email;
    if (fetching) return <LoadingSpinner />;
    if (isEmpty(user) || isNil(user)) return <NotFound />;
    return (
      <div className="user-show-view">
        <HtmlTitle title={displayName} />

        <div>
          <h1>{displayName}</h1>
          <p>Email: {email}</p>
          <p>Phone number: {phoneNumber}</p>
          <p>
            Roles: {isEmpty(roles) ? 'None' : map('type', roles).join(', ')}
          </p>
          <p>Food Preferences: {foodPreferences}</p>
        </div>
        <InvisibleLink to={`/admin/users/${id}/edit`}>Edit</InvisibleLink>
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
