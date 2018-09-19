import React from 'react';
import { shallow } from 'enzyme';
import User from './User';
import NotFound from '../NotFound';

it('should render without crashing', () => {
  const func = jest.fn();
  const currentUser = {};
  shallow(<User currentUser={currentUser} getCategory={func} />);
});
