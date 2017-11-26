import React from 'react'
import { shallow } from 'enzyme'
import { SuccessMessage } from './SuccessMessage';

it("should render without crashing", () => {
  shallow(<SuccessMessage message='success' />)
})
