import React from 'react'
import { shallow } from 'enzyme'
import ProductionLogin from './ProductionLogin'
import { MemoryRouter } from 'react-router-dom'

it('should render without crashing', () => {
  shallow(<MemoryRouter><ProductionLogin /></MemoryRouter>)
})
