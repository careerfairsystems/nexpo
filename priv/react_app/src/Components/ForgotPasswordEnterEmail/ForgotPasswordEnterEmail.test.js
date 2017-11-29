import React from 'react'
import {shallow} from 'enzyme'
import ForgotPasswordEnterEmail from './ForgotPasswordEnterEmail'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

it("can render without crashing", () => {
  const props = {
    callBackend: jest.fn()
  }
  shallow(<ForgotPasswordEnterEmail {...props}/>)
})

it("renders an input field", () => {
  const props = {
    callBackend: jest.fn()
  }
  const wrapper = shallow(<ForgotPasswordEnterEmail {...props}/>)
  expect(wrapper.find(TextField)).toHaveLength(1)
})

it("renders a button", () => {
  const props = {
    callBackend: jest.fn()
  }
  const wrapper = shallow(<ForgotPasswordEnterEmail {...props}/>)
  expect(wrapper.find(RaisedButton)).toHaveLength(1)
})
