import React from 'react';
import { shallow } from 'enzyme';

import SessionApplication from './SessionApplication';

it('renders without crashing', () => {
  const func = () => 'a';
  shallow(<SessionApplication getAllCompanies={func} getCurrentUser={func} />);
});
