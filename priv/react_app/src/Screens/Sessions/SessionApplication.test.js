import React from 'react';
import { shallow } from 'enzyme';

import SessionApplication from './SessionApplication';

it('renders without crashing', () => {
  shallow(<SessionApplication />);
});
