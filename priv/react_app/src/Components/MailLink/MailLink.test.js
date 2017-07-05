import React from 'react'
import { shallow } from 'enzyme'
import MailLink from './MailLink'

it('should render without crashing', () => {
  shallow(<MailLink to="tester@test.test"/>)
})
