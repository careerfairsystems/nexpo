import React from 'react';
import { shallow } from 'enzyme';

import Roles from './Roles';
import LoadingSpinner from '../../../Components/LoadingSpinner';

describe('Roles', () => {
  let props;
  beforeEach(() => {
    props = {
      roles: {
        '1': { id: 1, type: 'admin', permissions: ['read_all', 'write_all'] },
        '2': { id: 2, type: 'pleb' }
      },
      getAllRoles: jest.fn(),
      fetching: false,
      deleteRole: jest.fn()
    };
  });

  it('should render without crashing', () => {
    shallow(<Roles {...props} />);
  });

  it('should render loading', () => {
    const wrapper = shallow(<Roles {...props} fetching />);
    expect(wrapper.find(LoadingSpinner)).toHaveLength(1);
  });

  it('calls fetch all roles prop on mount', () => {
    shallow(<Roles {...props} />);

    expect(props.getAllRoles).toHaveBeenCalledTimes(1);
  });
});
