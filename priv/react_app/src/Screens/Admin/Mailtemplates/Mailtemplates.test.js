import React from 'react';
import { shallow } from 'enzyme';
import { Table } from 'antd';

import Mailtemplates from './Mailtemplates';
import LoadingSpinner from '../../../Components/LoadingSpinner';

describe('mailtemplates', () => {
  let props;
  beforeEach(() => {
    props = {
      fetching: false,
      getAllMailtemplates: jest.fn(),
      deleteMailtemplate: jest.fn()
    };
  });

  it('should render without crashing', () => {
    shallow(<Mailtemplates {...props} />);
  });

  it('should render loading', () => {
    const wrapper = shallow(<Mailtemplates {...props} fetching />);
    expect(wrapper.find(LoadingSpinner)).toHaveLength(1);
  });

  it('calls fetch all mailtemplates prop on mount', () => {
    const func = jest.fn();
    shallow(<Mailtemplates {...props} getAllMailtemplates={func} />);

    expect(func).toHaveBeenCalledTimes(1);
  });

  it('should render mailtemplates', () => {
    const mailtemplates = {
      '1': {
        id: 1,
        name: 'Welcome',
        content: '<h1>Welcome!</h1>'
      },
      '2': {
        id: 2,
        name: 'Signup',
        content: '<h1>Welcome!</h1>'
      }
    };
    const wrapper = shallow(
      <Mailtemplates {...props} id="1" mailtemplates={mailtemplates} />
    );

    expect(wrapper.find(Table)).toHaveLength(1);
  });
});
