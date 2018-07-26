import React from 'react';
import { shallow } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import DevelopmentLogin from './DevelopmentLogin';

it('should render without crashing', () => {
  shallow(
    <MemoryRouter>
      <DevelopmentLogin />
    </MemoryRouter>
  );
});
