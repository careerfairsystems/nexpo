import React from 'react';
import { shallow } from 'enzyme';
import InvisibleLink from './InvisibleLink';

it('renders without crashing', () => {
  shallow(<InvisibleLink to="/test">Test</InvisibleLink>);
});
