import React from 'react'
import { shallow } from 'enzyme'
import InitialSignup from './InitialSignup'

it("should render without crashing", () => {
  shallow(<InitialSignup />)
})
