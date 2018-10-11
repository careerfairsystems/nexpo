import React from 'react';
import { shallow } from 'enzyme';
import LoadingSpinner from './LoadingSpinner';

it('renders without crashing', () => {
  shallow(<LoadingSpinner />);
});
