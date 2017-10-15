import React from 'react'
import { shallow } from 'enzyme'
import Company from './Company'
import { MemoryRouter } from 'react-router-dom'

it('should render without crashing', () => {
  shallow(<MemoryRouter><Company /></MemoryRouter>)
})
