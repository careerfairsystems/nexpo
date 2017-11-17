import React from 'react'
import { shallow } from 'enzyme'
import Companies from './Companies'

it("should render without crashing", () => {
  const func = () => 'a'
  shallow(<Companies getAllCompanies={func}/>)
})

it("calls fetch all companies prop on mount", () => {
  const func = jest.fn()
  const wrapper = shallow(<Companies getAllCompanies={func}/>)

  expect(func).toHaveBeenCalledTimes(1)
})
