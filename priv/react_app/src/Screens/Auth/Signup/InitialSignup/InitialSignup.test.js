import React from 'react';
import { shallow } from 'enzyme';
import InitialSignup from './InitialSignup';
import SuccessMessage from '../../../../Components/SuccessMessage';

it('should render without crashing', () => {
  shallow(<InitialSignup />);
});
it('should render SuccessMessage when finished', () => {
  const wrapper = shallow(<InitialSignup finished />);
  wrapper.setState({ finished: true });
  expect(wrapper.find(SuccessMessage)).toHaveLength(1);
});
