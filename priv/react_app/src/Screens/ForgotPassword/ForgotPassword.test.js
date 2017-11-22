import React from 'react'
import ForgotPassword from './ForgotPassword'
import {shallow} from 'enzyme'
import ReplaceForgottenPassword from './../../Components/ReplaceForgottenPassword'
import ForgotPasswordEnterEmail from './../../Components/ForgotPasswordEnterEmail'

it("can render without crashing", () => {
  shallow(<ForgotPassword/>)
})

// it("renders ReplaceForgottenPassword", () => {
//   const wrapper = shallow(<ForgotPassword/>)
//   expect(wrapper.find(ReplaceForgottenPassword)).toHaveLength(1)
// })

it("renders ForgotPasswordEnterEmail", () => {
  const wrapper = shallow(<ForgotPassword/>)
  expect(wrapper.find(ForgotPasswordEnterEmail)).toHaveLength(1)
})
