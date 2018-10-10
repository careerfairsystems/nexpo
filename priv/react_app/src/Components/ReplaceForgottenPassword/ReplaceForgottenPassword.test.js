import React from 'react';
import { shallow } from 'enzyme';
import ReplaceForgottenPassword from './ReplaceForgottenPassword';
import { NotFound } from '../../Screens/NotFound/NotFound';

it('can render without crashing', () => {
  const props = {
    verifyKey: jest.fn(),
    sendNewPasswordToBackend: jest.fn(),
    hashKey: 'random-string',
    keyIsValid: true
  };
  shallow(<ReplaceForgottenPassword {...props} />);
});

it('calls verify key on load', () => {
  const props = {
    verifyKey: jest.fn(),
    sendNewPasswordToBackend: jest.fn(),
    hashKey: 'random-string',
    keyIsValid: true
  };
  shallow(<ReplaceForgottenPassword {...props} />);
  expect(props.verifyKey).toHaveBeenCalledTimes(1);
});

it('should render NotFound if key is not valid', () => {
  const props = {
    verifyKey: jest.fn(),
    sendNewPasswordToBackend: jest.fn(),
    hashKey: 'random-string',
    keyIsValid: false
  };
  const wrapper = shallow(<ReplaceForgottenPassword {...props} />);
  expect(wrapper.find(NotFound)).toHaveLength(1);
});
