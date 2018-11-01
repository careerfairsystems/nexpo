import React from 'react';
import { shallow } from 'enzyme';
import ReplaceForgottenPassword from './ReplaceForgottenPassword';
import { NotFound } from '../../Screens/NotFound/NotFound';
import SuccessMessage from '../SuccessMessage';

describe('ReplaceForgottenPassword', () => {
  let props;
  beforeEach(() => {
    props = {
      verifyKey: jest.fn(),
      sendNewPasswordToBackend: jest.fn(),
      hashKey: 'random-string',
      keyIsValid: true
    };
  });

  it('can render without crashing', () => {
    shallow(<ReplaceForgottenPassword {...props} />);
  });

  it('calls verify key on load', () => {
    shallow(<ReplaceForgottenPassword {...props} />);
    expect(props.verifyKey).toHaveBeenCalledTimes(1);
  });

  it('should render NotFound if key is not valid', () => {
    const wrapper = shallow(
      <ReplaceForgottenPassword {...props} keyIsValid={false} />
    );
    expect(wrapper.find(NotFound)).toHaveLength(1);
  });

  it('should render SuccessMessage on succes and with validkey', () => {
    const wrapper = shallow(
      <ReplaceForgottenPassword {...props} keyIsValid success />
    );
    expect(wrapper.find(SuccessMessage)).toHaveLength(1);
  });

  it('sendQueryToBackend calls sendNewPasswordToBackend with correct params', () => {
    const wrapper = shallow(<ReplaceForgottenPassword {...props} />);
    const values = { password: 'password', passwordConfirmation: 'password' };
    wrapper.instance().sendQueryToBackend(values);
    expect(props.sendNewPasswordToBackend).toHaveBeenCalledWith({
      password: values.password,
      passwordConfirmation: values.passwordConfirmation
    });
  });
});
