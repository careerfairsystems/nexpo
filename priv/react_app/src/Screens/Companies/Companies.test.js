import React from 'react'
import { shallow } from 'enzyme'
import Companies from './Companies'

it("should render without crashing", () => {
  shallow(<Companies/>)
})
