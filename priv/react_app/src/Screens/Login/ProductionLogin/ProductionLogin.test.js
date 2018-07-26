import React from 'react';
import { shallow } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import ProductionLogin from './ProductionLogin';

it('should render without crashing', () => {
  shallow(
    <MemoryRouter>
      <ProductionLogin />
    </MemoryRouter>
  );
});
