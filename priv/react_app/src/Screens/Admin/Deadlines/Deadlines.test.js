import React from 'react';
import { shallow } from 'enzyme';
import { Table } from 'antd';

import Deadlines from './Deadlines';
import LoadingSpinner from '../../../Components/LoadingSpinner';

describe('deadlines', () => {
  let props;
  beforeEach(() => {
    props = {
      fetching: false,
      getAllDeadlines: jest.fn(),
      deleteDeadline: jest.fn()
    };
  });
  it('should render without crashing', () => {
    shallow(<Deadlines {...props} />);
  });

  it('should render loading', () => {
    const wrapper = shallow(<Deadlines {...props} fetching />);
    expect(wrapper.find(LoadingSpinner)).toHaveLength(1);
  });

  it('calls fetch all deadlines prop on mount', () => {
    const func = jest.fn();
    shallow(<Deadlines {...props} getAllDeadlines={func} />);

    expect(func).toHaveBeenCalledTimes(1);
  });

  it('should render deadlines', () => {
    const deadlines = {
      '1': {
        id: 1,
        name: 'Host Application',
        start: 'DATE',
        end: 'DATE'
      },
      '2': {
        id: 2,
        name: 'Company Registration',
        start: 'DATE',
        end: 'DATE'
      }
    };
    const wrapper = shallow(
      <Deadlines id="1" {...props} deadlines={deadlines} />
    );

    expect(wrapper.find(Table)).toHaveLength(1);
  });
});
