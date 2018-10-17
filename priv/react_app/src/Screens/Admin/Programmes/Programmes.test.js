import React from 'react';
import { shallow } from 'enzyme';
import { Table } from 'antd';

import Programmes from './Programmes';
import LoadingSpinner from '../../../Components/LoadingSpinner';

describe('Programmes', () => {
  let props;
  beforeEach(() => {
    props = {
      programmes: {},
      fetching: false,
      getAllProgrammes: jest.fn(),
      deleteProgramme: jest.fn()
    };
  });

  it('should render without crashing', () => {
    shallow(<Programmes {...props} />);
  });

  it('should render loading', () => {
    const wrapper = shallow(<Programmes {...props} fetching />);
    expect(wrapper.find(LoadingSpinner)).toHaveLength(1);
  });

  it('calls fetch all programmes prop on mount', () => {
    const func = jest.fn();
    shallow(<Programmes {...props} getAllProgrammes={func} />);

    expect(func).toHaveBeenCalledTimes(1);
  });

  it('should render programmes', () => {
    const programmes = {
      '1': {
        id: 1,
        name: 'Datateknik'
      },
      '2': {
        id: 2,
        name: 'Annat program'
      }
    };
    const wrapper = shallow(
      <Programmes {...props} id="1" programmes={programmes} />
    );

    expect(wrapper.find(Table)).toHaveLength(1);
  });
});
