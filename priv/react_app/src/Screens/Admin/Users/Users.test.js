import React from 'react';
import { shallow } from 'enzyme';
import { Table } from 'antd';

import Users from './Users';
import LoadingSpinner from '../../../Components/LoadingSpinner';

it('should render without crashing', () => {
  const func = () => 'a';
  shallow(<Users getAllUsers={func} />);
});

it('should render loading', () => {
  const func = () => 'a';
  const wrapper = shallow(<Users fetching getAllUsers={func} />);
  expect(wrapper.find(LoadingSpinner)).toHaveLength(1);
});

it('calls fetch all users prop on mount', () => {
  const func = jest.fn();
  shallow(<Users getAllUsers={func} />);

  expect(func).toHaveBeenCalledTimes(1);
});

it('should render users', () => {
  const func = jest.fn();
  const users = {
    '1': {
      id: 1,
      firstName: 'First',
      lastName: 'Last',
      email: 'first.name@domain.com'
    },
    '2': {
      id: 2,
      firstName: 'Dev',
      lastName: 'Dev',
      email: 'dev@it.now'
    }
  };
  const wrapper = shallow(<Users id="1" users={users} getAllUsers={func} />);

  expect(wrapper.find(Table)).toHaveLength(1);
});
