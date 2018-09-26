import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { hasPermission } from '../../Util/PermissionsHelper';

/**
 * This components extends Router from react-router.
 * - Protects the route so only logged-in users can reach it
 * - It redirects to login if user is not logged in
 */
class PrivateRoute extends Component {
  render() {
    const {
      component: Component,
      currentUser,
      isLoggedIn,
      ...rest
    } = this.props;
    return (
      <Route
        {...rest}
        render={props => {
          if (isLoggedIn && hasPermission(currentUser, props.location.pathname))
            return <Component {...props} />;
          return (
            <Redirect
              to={{ pathname: '/start', state: { from: props.location } }}
            />
          );
        }}
      />
    );
  }
}

PrivateRoute.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired
};

export default PrivateRoute;
