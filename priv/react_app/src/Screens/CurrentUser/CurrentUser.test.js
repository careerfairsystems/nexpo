import React from 'react';
import { shallow } from 'enzyme';
import { Button } from 'antd';
import CurrentUser from './CurrentUser';
import LoadingSpinner from '../../Components/LoadingSpinner';
import NotFound from '../NotFound';

describe('userform should function correctly', () => {
  let props;
  beforeEach(() => {
    props = {
      currentStudent: {
        resumeSvUrl: 'oldPlaceholder.com'
      },
      currentUser: {
        id: 1,
        firstName: 'John',
        lastName: 'Smith',
        phoneNumber: '11111',
        foodPreferences: 'Cake',
        roles: []
      },
      fetching: false,
      getCurrentUser: jest.fn(),
      getAllProgrammes: jest.fn(),
      deleteCurrentUser: jest.fn(),
      logout: jest.fn(),
      resetForm: jest.fn(),
      updateCurrentUser: jest.fn(),
      updateCurrentStudent: jest.fn()
    };
  });

  it('should render without crashing', () => {
    shallow(<CurrentUser {...props} />);
  });

  it('should render loading when is fetching', () => {
    props.fetching = true;
    const wrapper = shallow(<CurrentUser {...props} />);
    expect(wrapper.find(LoadingSpinner).length).toBe(1);
  });

  it('should render notfound when currentUser is empty and not fetching', () => {
    const wrapper = shallow(<CurrentUser {...props} currentUser={{}} />);
    expect(wrapper.find(NotFound).length).toBe(1);
  });

  it('should only update the changed values', () => {
    const wrapper = shallow(<CurrentUser {...props} />);
    const { currentUser, updateCurrentUser } = props;
    const { firstName, lastName, foodPreferences } = currentUser;
    const phoneNumber = '13371337';
    const values = { firstName, lastName, phoneNumber, foodPreferences };
    wrapper.instance().updateUser(values);
    expect(updateCurrentUser).toHaveBeenCalledTimes(1);
    expect(updateCurrentUser).toHaveBeenCalledWith({ user: values });
  });

  it('should update student and reset state', () => {
    const wrapper = shallow(<CurrentUser {...props} />);
    const { updateCurrentStudent } = props;
    const resumeEnUrl = 'placeholder.com';
    wrapper.instance().updateStudent({ resumeEnUrl });
    expect(updateCurrentStudent).toHaveBeenCalledWith({
      student: { resumeEnUrl }
    });
  });

  it('should delete user properly', () => {
    const wrapper = shallow(<CurrentUser {...props} />);
    const { deleteCurrentUser, logout } = props;
    wrapper.instance().deleteCurrentUser();
    expect(deleteCurrentUser).toHaveBeenCalledTimes(1);
    expect(logout).toHaveBeenCalledTimes(1);
    wrapper.find(Button).simulate('click');
  });
});
