import React from 'react';
import { shallow } from 'enzyme';
import YourCompanyHome from './YourCompanyHome';

it('should render without crashing', () => {
  shallow(<YourCompanyHome />);
});
