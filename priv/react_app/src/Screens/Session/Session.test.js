import React from 'react';
import { shallow } from 'enzyme';
import Session from './Session';
import InvisibleLink from '../../Components/InvisibleLink';

it('should render without crashiang', () => {
  shallow(<Session />);
});

it('should render links to view sessions with correct titles', () => {
  const wrapper = shallow(<Session />);
  expect(wrapper.find(InvisibleLink).length).toEqual(4);
  expect(wrapper.find(InvisibleLink).get(0).props.children).toEqual(
    ' profile '
  );
  expect(wrapper.find(InvisibleLink).get(1).props.children).toEqual(' apply ');
  expect(wrapper.find(InvisibleLink).get(2).props.children).toEqual(' here');
  expect(wrapper.find(InvisibleLink).get(3).props.children).toEqual(
    'Go to Companies'
  );
});
