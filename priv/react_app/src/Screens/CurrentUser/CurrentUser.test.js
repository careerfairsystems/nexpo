import React from 'react';
import { shallow } from 'enzyme';
import CurrentUser from './CurrentUser';
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
    getCurrentUser: jest.fn(),
    putMe: jest.fn(),
    putStudent: jest.fn()
  };
  shallow(<CurrentUser {...props} />);
});

it('should render loading when currentUser is empty', () => {
  const props = {
    currentUser: {},
    fetching: false,
    getCurrentUser: jest.fn(),
    putMe: jest.fn(),
    putStudent: jest.fn()
  };
  const wrapper = shallow(<CurrentUser {...props} />);
  expect(wrapper.find(LoadingSpinner).length).toBe(1);
});
