import React from 'react'
import { expect } from 'chai';
import { shallow, mount } from 'enzyme'
import Login from './Login'
import { MemoryRouter } from 'react-router-dom'

it('should render without crashing', () => {
  shallow(<MemoryRouter><Login /></MemoryRouter>)
})

it('should have input fields for username and password')
