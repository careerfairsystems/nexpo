import React from 'react';
import { shallow } from 'enzyme';
import User from './User';
import NotFound from '../NotFound';
// import HtmlTitle from '../../Components/HtmlTitle';

it('should render without crashing', () => {
  const user = {};
  const func = jest.fn();
  shallow(<User id="1" user={user} getUser={func} updateUser={func} />);
});

it('should render NotFound if there is no user', () => {
  const user = {};
  const func = jest.fn();
  const wrapper = shallow(
    <User id="1" user={user} getUser={func} updateUser={func} />
  );

  expect(wrapper.find(NotFound)).toHaveLength(1);
});

// it('should set html title', () => {
//   const user = {
//     name: 'Dev'
//   };
//   const func = jest.fn();
//   const wrapper = shallow(<User id="1" user={user} getUser={func} updateUser={func} />);
//
//   expect(
//     wrapper.contains(<HtmlTitle title={capitalize(user.name)} />)
//   ).toBeTruthy();
// });

it('should render user information', () => {
  const user = {
    email: 'dev@it',
    firstName: 'Dev',
    lastName: 'X'
  };
  const func = jest.fn();
  const wrapper = shallow(
    <User id="1" user={user} getUser={func} updateUser={func} />
  );

  expect(wrapper.contains(<h1>Dev X</h1>)).toBeTruthy();
});
