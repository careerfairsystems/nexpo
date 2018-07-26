import React from 'react';
import { shallow } from 'enzyme';
import FinalizeSignup from './FinalizeSignup';

it('Should render without crashing', () => {
  shallow(<FinalizeSignup signupKey="randomly-generated-key" />);
});
