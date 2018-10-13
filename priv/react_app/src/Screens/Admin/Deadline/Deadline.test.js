import React from 'react';
import { shallow } from 'enzyme';
import Deadline from './Deadline';
import NotFound from '../../NotFound';
import LoadingSpinner from '../../../Components/LoadingSpinner';
import DeadlineForm from '../../../Forms/DeadlineForm';

describe('Deadline', () => {
  let props;
  beforeEach(() => {
    props = {
      deadline: {},
      createDeadline: jest.fn(),
      fetching: false,
      getDeadline: jest.fn(),
      resetForm: jest.fn(),
      updateDeadline: jest.fn()
    };
  });

  it('should render without crashing', () => {
    const deadline = {
      name: 'Test Deadline',
      start: 'DATE',
      end: 'DATE',
      signature: 'Best Regards\nDevelopers'
    };
    shallow(<Deadline id="1" {...props} deadline={deadline} />);
  });

  it('should render loading while fetching ', () => {
    const wrapper = shallow(<Deadline id="1" {...props} fetching />);

    expect(wrapper.find(LoadingSpinner)).toHaveLength(1);
  });

  it('should render NotFound if there is no deadline and not fetching', () => {
    const wrapper = shallow(<Deadline id="1" {...props} />);

    expect(wrapper.find(NotFound)).toHaveLength(1);
  });

  it('should render deadline form', () => {
    const deadline = {
      name: 'Test Deadline',
      start: 'DATE',
      end: 'DATE',
      signature: 'Best Regards\nDevelopers'
    };
    const wrapper = shallow(<Deadline id="1" {...props} deadline={deadline} />);

    expect(wrapper.find(DeadlineForm)).toBeTruthy();
  });

  // If there is not a deadline in props we want to create a new one
  it('updateDeadline functions correctly', () => {
    const wrapper = shallow(<Deadline id="1" {...props} />);
    const newDate = 'DATE';
    wrapper.instance().updateDeadline({ start: newDate, end: newDate });
    expect(props.createDeadline).toHaveBeenCalledWith({
      deadline: { start: newDate, end: newDate }
    });
  });

  // If there is a deadline in props we want to update it
  it('updateDeadline functions correctly', () => {
    const deadline = {
      name: 'Test Deadline',
      start: 'DATE',
      end: 'DATE',
      signature: 'Best Regards\nDevelopers'
    };
    const id = '1';
    const wrapper = shallow(
      <Deadline id={id} {...props} deadline={deadline} />
    );
    const newDate = 'NEW DATE';
    wrapper.instance().updateDeadline({ start: newDate });
    expect(props.updateDeadline).toHaveBeenCalledWith(id, {
      deadline: { start: newDate }
    });
  });
});
