import React from 'react';
import { shallow } from 'enzyme';
import ErrorMessage from './ErrorMessage';

it('should render without crashing', () => {
  shallow(<ErrorMessage message="error" />);
});
