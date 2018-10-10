import React from 'react';
import { shallow } from 'enzyme';
import Table from 'antd/lib/table';
import Button from 'antd/lib/button';
import Roles from './Roles';
import LoadingSpinner from '../../../Components/LoadingSpinner';

it('should render without crashing', () => {
  const func = () => 'a';
  shallow(<Roles getAllRoles={func} />);
});

it('should render loading', () => {
  const func = () => 'a';
  const wrapper = shallow(<Roles fetching getAllRoles={func} />);
  expect(wrapper.find(LoadingSpinner)).toHaveLength(1);
});

it('calls fetch all roles prop on mount', () => {
  const func = jest.fn();
  const wrapper = shallow(<Roles getAllRoles={func} />);

  expect(func).toHaveBeenCalledTimes(1);
});

it('calls fetch all roles prop on mount', () => {
  const func = jest.fn();
  const wrapper = shallow(<Roles getAllRoles={func} />);

  wrapper.find(Button).simulate('click');
});

it('should render roles', () => {
  const func = jest.fn();
  const roles = {
    '1': {
      id: 1,
      type: 'admin',
      permissions: ['read_all', 'write_all']
    },
    '2': {
      id: 2,
      type: 'manager',
      permissions: ['read_users', 'write_users']
    }
  };
  const wrapper = shallow(<Roles id="1" roles={roles} getAllRoles={func} />);

  expect(wrapper.find(Table)).toHaveLength(1);
});
