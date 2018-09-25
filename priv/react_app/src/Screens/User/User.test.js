import React from 'react';
import { shallow } from 'enzyme';
import User from './User';
import LoadingSpinner from '../../Components/LoadingSpinner';

it('should render without crashing', () => {
  const props = {
    currentUser: {
      first_name: 'John',
      last_name: 'Smith',
      phone_number: '11111',
      roles: [{ type: 'host', permissions: ['read_companies'] }]
    },
    fetching: false,
    putMe: jest.fn(),
    putStudent: jest.fn()
  };
  shallow(<User {...props} />);
});

it('should render loading when currentUser is empty', () => {
  const props = {
    currentUser: {},
    fetching: false,
    putMe: jest.fn(),
    putStudent: jest.fn()
  };
  const wrapper = shallow(<User {...props} />);
  expect(wrapper.find(LoadingSpinner).length).toBe(1);
});
