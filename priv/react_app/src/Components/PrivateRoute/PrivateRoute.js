import * as React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { hasPermission } from '../../Util/PermissionsHelper';
import LoadingSpinner from '../LoadingSpinner';

/**
 * This components extends Router from react-router.
 * - Protects the route so only logged-in users can reach it
 * - It redirects to login if user is not logged in
 */

type Props = {
  component: React.ComponentType<{}>,
  currentUser: {
    email?: ?string,
    firstName?: ?string,
    lastName?: ?string,
    roles?: Array<{ type: string, permissions: Array<string> }>
  },
  fetching: boolean,
  isLoggedIn: boolean
};

const PrivateRoute = ({
  component: Component,
  currentUser,
  isLoggedIn,
  fetching,
  ...rest
}: Props) => (
  <Route
    {...rest}
    render={props => {
      if (fetching) return <LoadingSpinner />;
      if (isLoggedIn && hasPermission(currentUser, props.location.pathname))
        return <Component {...props} />;
      return (
        <Redirect to={{ pathname: '/info', state: { from: props.location } }} />
      );
    }}
  />
);

export default PrivateRoute;
