import React from 'react';
import { shallow } from 'enzyme';
import Mailtemplate from './Mailtemplate';
import NotFound from '../../NotFound';
import LoadingSpinner from '../../../Components/LoadingSpinner';
import MailtemplateForm from '../../../Forms/MailtemplateForm';

describe('Mailtemplate', () => {
  let props;
  beforeEach(() => {
    props = {
      mailtemplate: {},
      createMailtemplate: jest.fn(),
      fetching: false,
      getMailtemplate: jest.fn(),
      resetForm: jest.fn(),
      updateMailtemplate: jest.fn()
    };
  });

  it('should render without crashing', () => {
    const mailtemplate = {
      name: 'Test Mailtemplate',
      subject: 'Welcome!',
      content: '<h1>Hi and Welcome!</h1>',
      signature: 'Best Regards\nDevelopers'
    };
    shallow(<Mailtemplate id="1" {...props} mailtemplate={mailtemplate} />);
  });

  it('should render loading while fetching ', () => {
    const wrapper = shallow(<Mailtemplate id="1" {...props} fetching />);

    expect(wrapper.find(LoadingSpinner)).toHaveLength(1);
  });

  it('should render NotFound if there is no mailtemplate and not fetching', () => {
    const wrapper = shallow(<Mailtemplate id="1" {...props} />);

    expect(wrapper.find(NotFound)).toHaveLength(1);
  });

  it('should render mailtemplate form', () => {
    const mailtemplate = {
      name: 'Test Mailtemplate',
      subject: 'Welcome!',
      content: '<h1>Hi and Welcome!</h1>',
      signature: 'Best Regards\nDevelopers'
    };
    const wrapper = shallow(
      <Mailtemplate id="1" {...props} mailtemplate={mailtemplate} />
    );

    expect(wrapper.find(MailtemplateForm)).toBeTruthy();
  });

  // If there is not a mailtemplate in props we want to create a new one
  it('updateMailtemplate functions correctly', () => {
    const wrapper = shallow(<Mailtemplate id="1" {...props} />);
    const newSubject = 'Welcome!';
    wrapper.instance().updateMailtemplate({ subject: newSubject });
    expect(props.createMailtemplate).toHaveBeenCalledWith({
      mailtemplate: { id: '1', subject: newSubject }
    });
  });

  // If there is a mailtemplate in props we want to update it
  it('updateMailtemplate functions correctly', () => {
    const mailtemplate = {
      name: 'Test Mailtemplate',
      subject: 'Welcome!',
      content: '<h1>Hi and Welcome!</h1>',
      signature: 'Best Regards\nDevelopers'
    };
    const id = '1';
    const wrapper = shallow(
      <Mailtemplate id={id} {...props} mailtemplate={mailtemplate} />
    );
    const newSubject = 'Welcome to ARKAD!';
    wrapper.instance().updateMailtemplate({ subject: newSubject });
    expect(props.updateMailtemplate).toHaveBeenCalledWith(id, {
      mailtemplate: { id, subject: newSubject }
    });
  });
});
