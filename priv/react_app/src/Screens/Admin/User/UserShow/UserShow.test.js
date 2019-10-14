import React from 'react';
import { shallow } from 'enzyme';
import UserShow from './UserShow';
import NotFound from '../../../NotFound';
import LoadingSpinner from '../../../../Components/LoadingSpinner';

it('should render without crashing', () => {
  const props = {
    user: {},
    getUser: jest.fn(),
    updateUser: jest.fn(),
    createUser: jest.fn(),
    fetching: false,
    resetForm: jest.fn()
  };
  shallow(<UserShow id="1" {...props} />);
});

it('should render NotFound if there is no user', () => {
  const props = {
    user: {},
    getUser: jest.fn(),
    updateUser: jest.fn(),
    createUser: jest.fn(),
    fetching: false,
    resetForm: jest.fn()
  };
  const wrapper = shallow(<UserShow id="1" {...props} />);

  expect(wrapper.find(NotFound)).toHaveLength(1);
});

it('should render LoadingSpinner if fetching is true', () => {
  const props = {
    user: {},
    getUser: jest.fn(),
    updateUser: jest.fn(),
    createUser: jest.fn(),
    fetching: true,
    resetForm: jest.fn()
  };
  const wrapper = shallow(<UserShow id="1" {...props} />);

  expect(wrapper.find(LoadingSpinner)).toHaveLength(1);
});

it('displayName and roles should function correctly', () => {
  const user = {
    email: 'admin@test',
    firstName: 'Dev',
    lastName: 'X',
    roles: [{ type: 'admin' }]
  };
  const props = {
    getUser: jest.fn(),
    updateUser: jest.fn(),
    createUser: jest.fn(),
    fetching: false,
    resetForm: jest.fn()
  };
  const wrapper = shallow(<UserShow id="1" user={user} {...props} />);
  const displayName = wrapper.instance().displayName();
  const roles = wrapper.instance().roles();
  expect(roles).toEqual('admin');
  expect(displayName).toEqual(`${user.firstName} ${user.lastName}`);
});
