import React from 'react';
import { shallow } from 'enzyme';
import { NotFound } from './NotFound';

it('should render without crashing', () => {
  shallow(<NotFound />);
});
