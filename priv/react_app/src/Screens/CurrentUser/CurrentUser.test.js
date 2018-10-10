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
        roles: [],
        student: 1
      },

      fetching: false,
      getCurrentUser: jest.fn(),
      destroyCurrentUser: jest.fn(),
      logout: jest.fn(),
      updateCurrentUser: jest.fn(),
      updateCurrentStudent: jest.fn()
    };
  });

  it('should render without crashing', () => {
    props.roles = [{ type: 'host', permissions: ['read_companies'] }];
    shallow(<CurrentUser {...props} />);
  });

  it('should render loading when is fetching', () => {
    props.fetching = true;
    const wrapper = shallow(<CurrentUser {...props} />);
    expect(wrapper.find(LoadingSpinner).length).toBe(1);
  });

  it('should render notfound when currentUser is empty and not fetching', () => {
    props.currentUser = {};
    const wrapper = shallow(<CurrentUser {...props} />);
    expect(wrapper.find(NotFound).length).toBe(1);
  });

  it('should add/remove field from student when beforeUpload/onRemove is called', () => {
    const wrapper = shallow(<CurrentUser {...props} />);
    const placeholderUrl = 'placeholder.com';
    expect(wrapper.state('student').resumeSvUrl).toEqual(null);
    wrapper.instance().beforeUpload(placeholderUrl, 'resumeSvUrl');
    expect(wrapper.state('student').resumeSvUrl).toEqual(placeholderUrl);
    wrapper.instance().onRemove('resumeSvUrl');
    expect(wrapper.state('student').resumeSvUrl).toEqual(null);
  });

  it('should only update the changed values', () => {
    const wrapper = shallow(<CurrentUser {...props} />);
    const { currentUser, updateCurrentUser } = props;
    const { foodPreferences } = currentUser;
    const phoneNumber = '13371337';
    const values = { phoneNumber, foodPreferences };
    wrapper.instance().updateUser(values);
    expect(updateCurrentUser).toHaveBeenCalledTimes(1);
    expect(updateCurrentUser).toHaveBeenCalledWith({ user: values });
  });

  it('should update student and reset state', () => {
    const wrapper = shallow(<CurrentUser {...props} />);
    const { updateCurrentStudent } = props;
    const placeholderUrl = 'placeholder.com';
    const student = { resumeSvUrl: placeholderUrl, resumeEnUrl: null };
    wrapper.instance().beforeUpload(placeholderUrl, 'resumeSvUrl');
    expect(wrapper.state('student').resumeSvUrl).toEqual(placeholderUrl);
    wrapper.instance().updateStudent();
    expect(wrapper.state('student').resumeSvUrl).toEqual(null);
    expect(updateCurrentStudent).toHaveBeenCalledWith({ student });
  });

  it('should destroy user properly', () => {
    const wrapper = shallow(<CurrentUser {...props} />);
    const { currentUser, destroyCurrentUser, logout } = props;
    wrapper.instance().destroyCurrentUser();
    expect(destroyCurrentUser).toHaveBeenCalledWith(currentUser.id);
    expect(logout).toHaveBeenCalledTimes(1);
    wrapper.find(Button).simulate('click');
  });
});
