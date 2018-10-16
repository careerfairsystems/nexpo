import React from 'react';

import { shallow } from 'enzyme';
import CurrentCompanyEdit from './CurrentCompanyEdit';

it('should render without crashing', () => {
  const f = jest.fn();
  shallow(
    <CurrentCompanyEdit
      getCurrentCompany={f}
      id="1"
      currentCompany={{}}
      updateCurrentCompany={f}
    />
  );
});
