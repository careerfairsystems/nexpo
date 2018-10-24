import React from 'react';
import { shallow } from 'enzyme';

import StudentHome from './StudentHome';

it('renders without crashing', () => {
  shallow(<StudentHome />);
});
