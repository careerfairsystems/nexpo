import React from 'react';
import { shallow } from 'enzyme';

import AdminHome from './AdminHome';

it('renders without crashing', () => {
  shallow(<AdminHome />);
});

it('renders with roles and permissions', () => {
  shallow(<AdminHome roles={['admin']} permissions={['read_all']} />);
});
