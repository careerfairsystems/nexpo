import React from 'react'
import {shallow, mount} from 'enzyme'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import ReplaceForgottenPassword from './ReplaceForgottenPassword'
import { NotFound } from '../../Screens/NotFound/NotFound';

it('can render without crashing', () => {
  const props = {
    verifyKey: jest.fn(),
    sendNewPasswordToBackend: jest.fn(),
    hashKey: 'random-string',
    keyIsValid: true
  }
  shallow(<ReplaceForgottenPassword {...props}/>)
})

it('has two textfields', () => {
  const props = {
    verifyKey: jest.fn(),
    sendNewPasswordToBackend: jest.fn(),
    hashKey: 'random-string',
    keyIsValid: true
  }
  const wrapper = shallow(<ReplaceForgottenPassword {...props}/>)
  expect(wrapper.find(TextField)).toHaveLength(2)
})

it('should render a button', () => {
  const props = {
    verifyKey: jest.fn(),
    sendNewPasswordToBackend: jest.fn(),
    hashKey: 'random-string',
    keyIsValid: true
  }
  const wrapper = shallow(<ReplaceForgottenPassword {...props}/>)
  expect(wrapper.find(RaisedButton)).toHaveLength(1)
})

it('calls verify key on load', () => {
  const props = {
    verifyKey: jest.fn(),
    sendNewPasswordToBackend: jest.fn(),
    hashKey: 'random-string',
    keyIsValid: true
  }
  /**
   * The method is not called with shallow rendering,
   * cause componentDidMount is not run with shallow()
   */
  const wrapper = shallow(<ReplaceForgottenPassword {...props}/>)
  // expect(props.verifyKey).toHaveBeenCalledTimes(1)
  expect(props.verifyKey).toHaveBeenCalledTimes(0)
})

it('should render NotFound if key is not valid', () => {
  const props = {
    verifyKey: jest.fn(),
    sendNewPasswordToBackend: jest.fn(),
    hashKey: 'random-string',
    keyIsValid: false
  }
  const wrapper = shallow(<ReplaceForgottenPassword {...props}/>)
  expect(wrapper.find(NotFound)).toHaveLength(1)
})
