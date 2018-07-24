import React from 'react'
import { shallow } from 'enzyme'
import PrivateRoute from './PrivateRoute'

it('renders without crashing', () => {
  shallow(<PrivateRoute isLoggedIn={false}/>)
})
