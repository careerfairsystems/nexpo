import React from 'react'
import { shallow } from 'enzyme'
import DevelopmentLogin from './DevelopmentLogin'
import { MemoryRouter } from 'react-router-dom'

it('should render without crashing', () => {
  shallow(<MemoryRouter><DevelopmentLogin /></MemoryRouter>)
})
