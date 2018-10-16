import React from 'react';
import { shallow } from 'enzyme';
import LoadingSpinner from '../../../Components/LoadingSpinner';

import SessionApplication from './SessionApplication';

describe('SessionApplication', () => {
  let props;
  beforeEach(() => {
    props = {
      fetching: false,
      createStudentSessionAppl: jest.fn(),
      currentUser: {},
      currentStudent: {},
      getAllCompanies: jest.fn(),
      getCurrentUser: jest.fn(),
      resetForm: jest.fn(),
      updateCurrentStudent: jest.fn()
    };
  });

  it('renders without crashing', () => {
    shallow(<SessionApplication {...props} />);
  });

  it('should render LoadingSpinner while fetching', () => {
    const wrapper = shallow(<SessionApplication {...props} fetching />);
    expect(wrapper.find(LoadingSpinner)).toHaveLength(1);
  });

  it('updateStudent should call updateCurrentStudent with correct values', () => {
    const newCvEn = { uid: -1, fileName: 'New file' };
    const values = { resumeEnUrl: newCvEn };
    const wrapper = shallow(<SessionApplication {...props} />);
    wrapper.instance().updateStudent(values);
    expect(props.updateCurrentStudent).toHaveBeenCalledWith({
      student: values
    });
  });

  it('calls should call createSessionAppl with correct values', () => {
    const appl = { companyId: 1, motivation: 'New motivation' };
    const wrapper = shallow(<SessionApplication {...props} />);
    wrapper.instance().createStudentSessionAppl(appl);
    expect(props.createStudentSessionAppl).toHaveBeenCalledWith({
      studentSessionApplication: appl
    });
  });
});
