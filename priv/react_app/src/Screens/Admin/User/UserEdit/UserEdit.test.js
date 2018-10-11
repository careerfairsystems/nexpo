import React from 'react';
import { shallow } from 'enzyme';
import UserEdit from './UserEdit';
import NotFound from '../../../NotFound';
// import HtmlTitle from '../../../Components/HtmlTitle';

it('should render without crashing', () => {
  const props = {
    user: {},
    getUser: jest.fn(),
    updateUser: jest.fn(),
    createUser: jest.fn(),
    fetching: false,
    resetForm: jest.fn()
  };
  shallow(<UserEdit id="1" {...props} />);
});

it('should render NotFound if there is no user', () => {
  const props = {
    user: {},
    getUser: jest.fn(),
    updateUser: jest.fn(),
    createUser: jest.fn(),
    fetching: false,
    resetForm: jest.fn()
  };
  const wrapper = shallow(<UserEdit id="1" {...props} />);

  expect(wrapper.find(NotFound)).toHaveLength(1);
});
