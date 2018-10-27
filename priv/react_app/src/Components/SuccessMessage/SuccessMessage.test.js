import React from 'react';
import { shallow } from 'enzyme';
import SuccessMessage from './SuccessMessage';

it('should render without crashing', () => {
  const props = {
    message: 'success',
    linkText: 'Wow',
    linkUrl: 'placeholder.com'
  };
  shallow(<SuccessMessage {...props} />);
});
