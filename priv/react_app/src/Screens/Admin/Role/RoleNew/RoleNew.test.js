import React from 'react';
import { shallow } from 'enzyme';
import RoleNew from './RoleNew';

describe('RoleNew', () => {
  let props;
  beforeEach(() => {
    props = {
      createRole: jest.fn(),
      getAllUsers: jest.fn()
    };
  });

  it('should render without crashing', () => {
    shallow(<RoleNew {...props} />);
  });

  it('should create role', () => {
    const role = {
      type: 'test',
      permissions: ['read_all', 'write_all']
    };
    const func = jest.fn();
    const wrapper = shallow(<RoleNew {...props} createRole={func} />);

    wrapper.instance().createRole(role);

    expect(func).toHaveBeenCalledWith({ role });
  });
});
