import React from 'react';
import { shallow } from 'enzyme';

import SessionApplication from './SessionApplication';

it('renders without crashing', () => {
  const props = {
    createStudentSessionAppl: jest.fn(),
    getCurrentUser: jest.fn(),
    getAllCompanies: jest.fn(),
    updateCurrentStudent: jest.fn()
  };
  shallow(<SessionApplication {...props} />);
});
