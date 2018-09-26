import React from 'react';
import { shallow } from 'enzyme';
import CurrentUser from './CurrentUser';
import LoadingSpinner from '../../Components/LoadingSpinner';
import NotFound from '../NotFound';

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
    updateCurrentUser: jest.fn(),
    updateCurrentStudent: jest.fn()
  };
  shallow(<CurrentUser {...props} />);
});

it('should render loading when is fetching', () => {
  const props = {
    currentUser: {},
    fetching: true,
    getCurrentUser: jest.fn(),
    updateCurrentUser: jest.fn(),
    updateCurrentStudent: jest.fn()
  };
  const wrapper = shallow(<CurrentUser {...props} />);
  expect(wrapper.find(LoadingSpinner).length).toBe(1);
});
it('should render notfound when currentUser is empty and not fetching', () => {
  const props = {
    currentUser: {},
    fetching: false,
    getCurrentUser: jest.fn(),
    updateCurrentUser: jest.fn(),
    updateCurrentStudent: jest.fn()
  };
  const wrapper = shallow(<CurrentUser {...props} />);
  expect(wrapper.find(NotFound).length).toBe(1);
});
