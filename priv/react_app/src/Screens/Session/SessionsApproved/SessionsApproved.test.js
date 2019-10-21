import React from 'react';
import { shallow } from 'enzyme';
import { stat } from 'fs';
import LoadingSpinner from '../../../Components/LoadingSpinner';
import SessionApplications from './SessionsApproved';

describe('SessionApplications', () => {
  let props;
  beforeEach(() => {
    props = {
      sessions: [
        {
          id: 1,
          companyId: 1,
          studentId: 1,
          studentSessionStatus: 0,
          company: {
            name: 'Google',
            logoUrl: 'www.google.com/profile.jpg'
          },
          studentSessionTimeSlot: {
            start: '2018-01-01',
            end: '2018-01-01'
          }
        },
        {
          id: 2,
          companyId: 2,
          studentId: 1,
          studentSessionStatus: 0,
          company: {
            name: 'Victor AB',
            logoUrl: 'www.victorab.com/profile.jpg'
          },
          studentSessionTimeSlot: {
            start: '2018-01-01',
            end: '2018-01-01'
          }
        }
      ],
      companies: {},
      fetching: false,
      getAllCompanies: jest.fn(),
      updateSession: jest.fn()
    };
  });

  it('renders without crashing', () => {
    shallow(<SessionApplications {...props} />);
  });

  it('renders loadingspinner when fetching', () => {
    const wrapper = shallow(<SessionApplications {...props} fetching />);
    expect(wrapper.find(LoadingSpinner)).toHaveLength(1);
  });

  it('calls updateSession with correct parameters', () => {
    const wrapper = shallow(<SessionApplications {...props} />);
    const id = 1;
    const status = 1;
    expect(props.updateSession).toHaveBeenCalledTimes(0);
    wrapper.instance().updateSession(id, status);
    expect(props.updateSession).toHaveBeenCalledWith(id, status);
    expect(props.updateSession).toHaveBeenCalledTimes(1);
  });

  it('can render listitems', () => {
    const wrapper = shallow(<SessionApplications {...props} />);
    // Check to see that list items renders properly
    wrapper.find('List').dive();
  });
});
