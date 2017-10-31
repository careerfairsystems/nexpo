import React from 'react'
import { shallow } from 'enzyme'
import HtmlTitle from './HtmlTitle'

it("should render without crashing", () => {
  shallow(<HtmlTitle />)
})
