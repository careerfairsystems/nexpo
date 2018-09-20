import React from 'react';
import { shallow } from 'enzyme';
import User from './User';
import LoadingSpinner from '../../Components/LoadingSpinner';

it('should render without crashing', () => {
  const currentUser = {
    first_name: 'John',
    last_name: 'Smith',
    phone_number: '11111',
    roles: ['Host']
  };
  shallow(<User currentUser={currentUser} fetching={false} />);
});

it('should render loading when currentUser is empty', () => {
  const currentUser = {};
  const wrapper = shallow(<User currentUser={currentUser} fetching={false} />);
  expect(wrapper.find(LoadingSpinner).length).toBe(1);
});
it('should render loading when currentUser is empty', () => {
  const currentUser = {};
  const wrapper = shallow(<User currentUser={currentUser} fetching={false} />);
  expect(wrapper.find(LoadingSpinner).length).toBe(1);
});

it('toggles disabled correctly', () => {
  const currentUser = { first_name: 'John', last_name: 'Smith' };
  const wrapper = shallow(<User currentUser={currentUser} />);
  expect(wrapper.state().disabled).toBe(true);
  wrapper.find('Button').simulate('click');
  expect(wrapper.state().disabled).toBe(false);
});

it('updates state when receiving new props', () => {
  const currentUser = { first_name: 'John', last_name: 'Smith' };
  const updatedUser = {
    first_name: 'John',
    last_name: 'Smith',
    email: 'john_cool@smith.com'
  };
  const wrapper = shallow(<User currentUser={currentUser} />);
  expect(wrapper.state().currentUser).toEqual(currentUser);
  wrapper.setProps({ currentUser: updatedUser });
  expect(wrapper.state().currentUser).toEqual(updatedUser);
});

it('updatefield correctly updates user', () => {
  const currentUser = { first_name: 'John', last_name: 'Smith' };
  const updatedUser = {
    first_name: 'John',
    last_name: 'Smith',
    email: 'john_cool@smith.com'
  };
  const wrapper = shallow(<User currentUser={currentUser} />);
  expect(wrapper.state().currentUser).toEqual(currentUser);
  const key = 'food_preferences';
  const value = 'Cake';
  const newField = { [key]: value };
  wrapper.instance().updateUser('food_preferences', 'Cake');
  expect(wrapper.state().currentUser).toEqual({ ...currentUser, ...newField });
});
