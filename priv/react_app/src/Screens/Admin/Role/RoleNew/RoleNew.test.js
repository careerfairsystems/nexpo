import React from 'react';
import { shallow } from 'enzyme';
import RoleNew from './RoleNew';

it('should render without crashing', () => {
  const func = jest.fn();
  shallow(<RoleNew createRole={func} />);
});

it('should set html title', () => {
  const role = {
    type: 'test',
    permissions: ['read_all', 'write_all']
  };
  const func = jest.fn();
  const wrapper = shallow(<RoleNew createRole={func} />);

  wrapper.instance().createRole(role);

  expect(func).toHaveBeenCalledWith({ role });
});
