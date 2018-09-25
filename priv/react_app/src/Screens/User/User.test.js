import React from 'react';
import { shallow } from 'enzyme';
import { capitalize } from 'lodash/fp';
import User from './User';
import LoadingSpinner from '../../Components/LoadingSpinner';
// import HtmlTitle from '../../Components/HtmlTitle';

it('should render without crashing', () => {
  const user = {};
  const func = jest.fn();
  shallow(<User id="1" user={user} getUser={func} />);
});

it('should render LoadingSpinner if there is no user', () => {
  const user = {};
  const func = jest.fn();
  const wrapper = shallow(<User id="1" user={user} getUser={func} />);

  expect(wrapper.find(LoadingSpinner)).toHaveLength(1);
});

// it('should set html title', () => {
//   const user = {
//     name: 'Dev'
//   };
//   const func = jest.fn();
//   const wrapper = shallow(<User id="1" user={user} getUser={func} />);
//
//   expect(
//     wrapper.contains(<HtmlTitle title={capitalize(user.name)} />)
//   ).toBeTruthy();
// });

it('should render user information', () => {
  const user = {
    name: 'test'
  };
  const func = jest.fn();
  const wrapper = shallow(<User id="1" user={user} getUser={func} />);

  expect(wrapper.contains(<h1>{capitalize(user.name)}</h1>)).toBeTruthy();
});
