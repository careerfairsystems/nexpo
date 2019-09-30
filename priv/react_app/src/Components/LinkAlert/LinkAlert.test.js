import React from 'react';
import { shallow } from 'enzyme';
import LinkAlert from './LinkAlert';

describe('<LinkAlert />', () => {
  test('renders', () => {
    const wrapper = shallow(<LinkAlert />);
    expect(wrapper).toMatchSnapshot();
  });
});
