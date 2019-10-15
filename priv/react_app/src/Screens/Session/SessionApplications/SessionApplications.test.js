import React from 'react';
import { shallow } from 'enzyme';
import LoadingSpinner from '../../../Components/LoadingSpinner';
import SessionApplications from './SessionApplications';

describe('SessionApplications', () => {
  let props;
  beforeEach(() => {
    props = {
      applications: [
        {
          id: '1',
          company: {
            name: 'Google',
            logoUrl: 'www.google.com/profile.jpg'
          },
          studentId: '1',
          motivation: 'Really motivating'
        },
        {
          id: '2',
          company: {
            name: 'Victor AB',
            logoUrl: 'www.victorab.com/profile.jpg'
          },
          studentId: '1',
          motivation: 'Really motivating'
        }
      ],
      companies: {},
      fetching: false,
      getAllCompanies: jest.fn(),
      deleteStudentSessionAppl: jest.fn(),
      updateStudentSessionAppl: jest.fn()
    };
  });

  it('renders without crashing', () => {
    shallow(<SessionApplications {...props} />);
  });

  it('renders loadingspinner when fetching', () => {
    const wrapper = shallow(<SessionApplications {...props} fetching />);
    expect(wrapper.find(LoadingSpinner)).toHaveLength(1);
  });

  it('renders toggles edit correctly', () => {
    const wrapper = shallow(<SessionApplications {...props} />);
    expect(wrapper.state().editing).toEqual({});
    wrapper.instance().toggleEditMode('1');
    expect(wrapper.state().editing).toEqual({ '1': true });
    wrapper.instance().toggleEditMode('2');
    expect(wrapper.state().editing).toEqual({ '2': true });
  });

  it('calls updateStudentSessionApplwith correct parameters', () => {
    const wrapper = shallow(<SessionApplications {...props} />);
    const data = { motivation: 'Lul' };
    wrapper.instance().updateStudentSessionAppl('1', data);
    expect(props.updateStudentSessionAppl).toHaveBeenCalledWith('1', {
      studentSessionApplication: { ...data }
    });
  });

  it('can render listitems', () => {
    const wrapper = shallow(<SessionApplications {...props} />);
    // Check to see that list items renders properly
    wrapper.instance().toggleEditMode('1');
    wrapper.find('List').dive();
  });
});
