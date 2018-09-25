import React from 'react';
import { shallow } from 'enzyme';
import User from './User';
import LoadingSpinner from '../../Components/LoadingSpinner';

it('should render without crashing', () => {
  const currentUser = {
    first_name: 'John',
    last_name: 'Smith',
    phone_number: '11111',
    roles: [{ type: 'host', permissions: ['read_companies'] }]
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
