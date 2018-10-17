import React from 'react';
import { shallow } from 'enzyme';
import ForgotPassword from './ForgotPassword';
// import ReplaceForgottenPassword from '../../../Components/ReplaceForgottenPassword';
import ForgotPasswordEnterEmail from '../../../Components/ForgotPasswordEnterEmail';

it('can render without crashing', () => {
  shallow(<ForgotPassword />);
});

// it('renders ReplaceForgottenPassword', () => {
//   // need to change window.location.href = ...?key=123
//   const wrapper = shallow(<ForgotPassword />);
//   expect(wrapper.find(ReplaceForgottenPassword)).toHaveLength(1);
// });

it('renders ForgotPasswordEnterEmail', () => {
  const wrapper = shallow(<ForgotPassword />);
  expect(wrapper.find(ForgotPasswordEnterEmail)).toHaveLength(1);
});
