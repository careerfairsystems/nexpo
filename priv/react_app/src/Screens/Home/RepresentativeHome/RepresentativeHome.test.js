import React from 'react';
import { shallow } from 'enzyme';

import RepresentativeHome from './RepresentativeHome';

it('renders without crashing', () => {
  shallow(<RepresentativeHome />);
});
