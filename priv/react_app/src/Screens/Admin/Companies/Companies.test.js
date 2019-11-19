import React from 'react';
import { shallow } from 'enzyme';
import { Table } from 'antd';

import Companies from './Companies';
import LoadingSpinner from '../../../Components/LoadingSpinner';

describe('companies', () => {
  let props;
  beforeEach(() => {
    props = {
      fetching: false,
      getAllCompanies: jest.fn(),
      deleteCompany: jest.fn(),
      createBulkStudentSessions: jest.fn(),
      createBulk: jest.fn()
    };
  });

  it('should render without crashing', () => {
    shallow(<Companies {...props} />);
  });

  it('should render loading', () => {
    const wrapper = shallow(<Companies {...props} fetching />);
    expect(wrapper.find(LoadingSpinner)).toHaveLength(1);
  });

  it('calls fetch all companies prop on mount', () => {
    const func = jest.fn();
    shallow(<Companies {...props} getAllCompanies={func} />);

    expect(func).toHaveBeenCalledTimes(1);
  });

  it('should render companies', () => {
    const companies = {
      '1': {
        id: 1,
        name: 'Spotify',
        description: 'We do music!',
        website: 'www.spotify.com'
      },
      '2': {
        id: 2,
        name: 'Google',
        description: 'We code!',
        website: 'www.google.com'
      }
    };
    const wrapper = shallow(
      <Companies id="1" {...props} companies={companies} />
    );

    expect(wrapper.find(Table)).toHaveLength(1);
  });
});
