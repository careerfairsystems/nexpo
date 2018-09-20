import React from 'react';
import { shallow } from 'enzyme';

import Startscreen from './Startscreen';

it('renders without crashing', () => {
  shallow(<Startscreen />);
});
