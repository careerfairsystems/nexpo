import React from 'react';
import { shallow } from 'enzyme';
import Session from './Session';
import InvisibleLink from '../../Components/InvisibleLink';

it('should render without crashiang', () => {
  shallow(<Session />);
});

it('should render links to view sessions with correct titles', () => {
  const wrapper = shallow(<Session />);
  expect(wrapper.find(InvisibleLink).length).toEqual(3);
  expect(wrapper.find(InvisibleLink).get(0).props.children).toEqual('Apply');
  expect(wrapper.find(InvisibleLink).get(1).props.children).toEqual(
    'View your applications'
  );
  expect(wrapper.find(InvisibleLink).get(2).props.children).toEqual(
    'View available companies'
  );
});
