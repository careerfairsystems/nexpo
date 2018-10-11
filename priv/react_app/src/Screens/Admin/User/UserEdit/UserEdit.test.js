import React from 'react';
import { shallow } from 'enzyme';
import UserEdit from './UserEdit';
import NotFound from '../../../NotFound';
import LoadingSpinner from '../../../../Components/LoadingSpinner';

// import HtmlTitle from '../../../Components/HtmlTitle';

it('should render without crashing', () => {
  const props = {
    user: {},
    getUser: jest.fn(),
    updateUser: jest.fn(),
    createUser: jest.fn(),
    fetching: false,
    resetForm: jest.fn(),
    history:{}
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
    resetForm: jest.fn(),
    history:{}
  };
  const wrapper = shallow(<UserEdit id="1" {...props} />);

  expect(wrapper.find(NotFound)).toHaveLength(1);
});

it('should render LoadingSpinner if fetching is true', () => {
  const props = {
    user: {},
    getUser: jest.fn(),
    updateUser: jest.fn(),
    createUser: jest.fn(),
    fetching: true,
    resetForm: jest.fn(),
    history:{}
  };
  const wrapper = shallow(<UserEdit id="1" {...props} />);

  expect(wrapper.find(LoadingSpinner)).toHaveLength(1);
});

it('updateValues should call updateUser with correct values', () => {
  const props = {
    user: {},
    getUser: jest.fn(),
    updateUser: jest.fn(),
    createUser: jest.fn(),
    fetching: false,
    resetForm: jest.fn(),
    history:{push:jest.fn()}
  };
  const id = "1"
  const values ={phoneNumber: "1331337" }
  const wrapper = shallow(<UserEdit id={id} {...props} />);
  wrapper.instance().updateUser(values);
  expect(props.updateUser).toHaveBeenCalledWith(id, {user:values})
  expect(props.history.push).toHaveBeenCalledWith(`/admin/users/${id}`)

});
