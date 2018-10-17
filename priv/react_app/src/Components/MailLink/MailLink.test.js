import React from 'react';
import { shallow } from 'enzyme';
import MailLink from './MailLink';

it('should render without crashing', () => {
  const mail = 'Mail-link';
  shallow(<MailLink to="tester@test.test">{mail}</MailLink>);
});

it('renders a clickable mail link with correct name', () => {
  const email = 'test@email.com';
  const linkName = 'visible-test';
  const wrapper = shallow(<MailLink to={email}>{linkName}</MailLink>);

  const expected = <a href={`mailto:${email}`}>{linkName}</a>;
  expect(wrapper.contains(expected)).toBeTruthy();
});
