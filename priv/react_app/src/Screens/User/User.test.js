import React from 'react';
import { shallow, mount } from 'enzyme';
import User from './User';

it('should render without crashing', () => {
  const currentUser = {
    first_name: 'John',
    last_name: 'Smith',
    phone_number: '11111'
  };
  shallow(<User currentUser={currentUser} />);
});

it('toggles disabled correctly', () => {
  const currentUser = { first_name: 'John', last_name: 'Smith' };
  const wrapper = shallow(<User currentUser={currentUser} />);
  expect(wrapper.state().disabled).toBe(true);
  wrapper.find('Button').simulate('click');
  expect(wrapper.state().disabled).toBe(false);
});
