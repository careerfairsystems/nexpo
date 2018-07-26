import React from 'react';
import { shallow } from 'enzyme';
import Message from './Message';

it('should render without crashing', () => {
  shallow(<Message message="test" type="success" />);
});
