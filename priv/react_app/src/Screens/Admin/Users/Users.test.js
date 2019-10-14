import React from 'react';
import { shallow } from 'enzyme';
import { Table } from 'antd';

import Users from './Users';
import LoadingSpinner from '../../../Components/LoadingSpinner';

describe('users', () => {
  let props;
  beforeEach(() => {
    props = {
      fetching: false,
      getAllUsers: jest.fn(),
      deleteUser: jest.fn()
    };
  });

  it('should render without crashing', () => {
    shallow(<Users {...props} />);
  });

  it('should render loading', () => {
    const wrapper = shallow(<Users {...props} fetching />);
    expect(wrapper.find(LoadingSpinner)).toHaveLength(1);
  });

  it('calls fetch all users prop on mount', () => {
    const func = jest.fn();
    shallow(<Users {...props} getAllUsers={func} />);

    expect(func).toHaveBeenCalledTimes(1);
  });

  it('should render users', () => {
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
        email: 'admin@test.now'
      }
    };
    const wrapper = shallow(<Users id="1" {...props} users={users} />);

    expect(wrapper.find(Table)).toHaveLength(1);
  });
});
