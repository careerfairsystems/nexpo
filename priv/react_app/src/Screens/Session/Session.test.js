import React from 'react';
import { shallow } from 'enzyme';
import Session from './Session';
import InvisibleLink from '../../Components/InvisibleLink';

it('should render without crashing', () => {
  const wrapper = shallow(<Session />);
});
it('should render links to view sessions', () => {
  const wrapper = shallow(<Session />);
  expect(wrapper.find(InvisibleLink)).toHaveLength(3);
});
