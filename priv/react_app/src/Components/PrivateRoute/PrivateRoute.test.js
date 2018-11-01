import React from 'react';
import { shallow } from 'enzyme';
import PrivateRoute from './PrivateRoute';

it('renders without crashing', () => {
  const props = {
    component: () => <div>Test</div>,
    currentUser: {},
    fetching: false,
    isLoggedIn: false
  };
  shallow(<PrivateRoute {...props} />);
});
