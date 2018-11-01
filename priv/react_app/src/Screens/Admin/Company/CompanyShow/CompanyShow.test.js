import React from 'react';
import { shallow } from 'enzyme';
import CompanyShow from './CompanyShow';
import NotFound from '../../../NotFound';
import HtmlTitle from '../../../../Components/HtmlTitle';
import LoadingSpinner from '../../../../Components/LoadingSpinner';

describe('CompanyShow', () => {
  let props;
  beforeEach(() => {
    props = {
      company: {},
      createStudentSession: jest.fn(),
      createBulkStudentSessions: jest.fn(),
      deleteStudentSession: jest.fn(),
      fetching: false,
      getCompany: jest.fn(),
      resetForm: jest.fn(),
      updateCompany: jest.fn()
    };
  });

  it('should render without crashing', () => {
    const company = {
      id: '1',
      name: 'Test CompanyShow',
      website: 'testcompany.com',
      describe: 'We do testing!',
      studentSessionDays: 0,
      studentSessionTimeSlots: [
        {
          id: 1,
          start: '1970-01-01T00:00:00.000000',
          end: '2000-01-01T00:00:00.000000',
          location: 'E-huset'
        }
      ]
    };
    shallow(<CompanyShow id="1" {...props} company={company} />);
  });

  it('should render loading while fetching ', () => {
    const wrapper = shallow(<CompanyShow id="1" {...props} fetching />);

    expect(wrapper.find(LoadingSpinner)).toHaveLength(1);
  });

  it('should render NotFound if there is no company and not fetching', () => {
    const wrapper = shallow(<CompanyShow id="1" {...props} />);

    expect(wrapper.find(NotFound)).toHaveLength(1);
  });

  it('should set html title', () => {
    const company = {
      id: '1',
      name: 'Test CompanyShow',
      website: 'testcompany.com',
      describe: 'We do testing!',
      studentSessionDays: 3
    };
    const wrapper = shallow(
      <CompanyShow id="1" {...props} company={company} />
    );

    expect(wrapper.contains(<HtmlTitle title={company.name} />)).toBeTruthy();
  });

  it('should render company information', () => {
    const company = {
      id: '1',
      name: 'Test CompanyShow',
      website: 'testcompany.com',
      describe: 'We do testing!',
      studentSessionDays: 1
    };
    const wrapper = shallow(
      <CompanyShow id="1" {...props} company={company} />
    );

    expect(wrapper.contains(<h1>{company.name}</h1>)).toBeTruthy();
    // expect(wrapper.find(MailLink)).toHaveLength(1);
  });
});
