import React from 'react';
import { shallow } from 'enzyme';
import UserShow from './UserShow';
import NotFound from '../../../NotFound';
// import HtmlTitle from '../../../Components/HtmlTitle';

it('should render without crashing', () => {
  const func = jest.fn();
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

it('should render user information', () => {
  const user = {
    email: 'dev@it',
    firstName: 'Dev',
    lastName: 'X'
  };
  const props = {
    getUser: jest.fn(),
    updateUser: jest.fn(),
    createUser: jest.fn(),
    fetching: false,
    resetForm: jest.fn()
  };
  const wrapper = shallow(<UserShow id="1" user={user} {...props} />);

  expect(wrapper.contains(<h1>Dev X</h1>)).toBeTruthy();
});
