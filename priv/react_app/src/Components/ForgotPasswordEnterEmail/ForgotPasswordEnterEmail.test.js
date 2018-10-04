import React from 'react';
import { shallow } from 'enzyme';
import Button from 'antd/lib/button';
import Input from 'antd/lib/input';
import ForgotPasswordEnterEmail from './ForgotPasswordEnterEmail';
import { SuccessMessage } from '../SuccessMessage/SuccessMessage';

it('can render without crashing', () => {
  const props = {
    callBackend: jest.fn()
  };
  shallow(<ForgotPasswordEnterEmail {...props} />);
});

it('renders SuccessMessage on success', () => {
  const props = {
    callBackend: jest.fn(),
    success: true
  };
  const wrapper = shallow(<ForgotPasswordEnterEmail {...props} />);
  expect(wrapper.find(SuccessMessage)).toHaveLength(1);
});

it('renders an input field', () => {
  const props = {
    callBackend: jest.fn()
  };
  const wrapper = shallow(<ForgotPasswordEnterEmail {...props} />);
  expect(wrapper.find(Input)).toHaveLength(1);
});

it('renders a button', () => {
  const props = {
    callBackend: jest.fn()
  };
  const wrapper = shallow(<ForgotPasswordEnterEmail {...props} />);
  expect(wrapper.find(Button)).toHaveLength(1);
});

it('input correctly updates state', () => {
  const props = {
    callBackend: jest.fn()
  };
  const email = 'dev@it';
  const wrapper = shallow(<ForgotPasswordEnterEmail {...props} />);
  expect(wrapper.state('email')).toEqual('');
  wrapper
    .find(Input)
    .props()
    .onChange({ target: { value: email } });
  expect(wrapper.state('email')).toEqual(email);
});

it('calls callBackend on button click and input enter press', () => {
  const props = {
    callBackend: jest.fn()
  };
  const wrapper = shallow(<ForgotPasswordEnterEmail {...props} />);
  const email1 = 'dev@it';
  const email2 = 'test@it';
  wrapper.setState({ email: email1 });
  expect(props.callBackend).toHaveBeenCalledTimes(0);
  wrapper.find(Button).simulate('click');
  expect(props.callBackend).toHaveBeenCalledTimes(1);
  expect(props.callBackend).lastCalledWith({ email: email1 });
  wrapper.setState({ email: email2 });
  wrapper
    .find(Input)
    .props()
    .onPressEnter();
  expect(props.callBackend).toHaveBeenCalledTimes(2);
  expect(props.callBackend).lastCalledWith({ email: email2 });
});
