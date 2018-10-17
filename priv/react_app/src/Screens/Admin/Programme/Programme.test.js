import React from 'react';
import { shallow } from 'enzyme';
import Programme from './Programme';
import NotFound from '../../NotFound';
import LoadingSpinner from '../../../Components/LoadingSpinner';
import ProgrammeForm from '../../../Forms/ProgrammeForm';

describe('Programme', () => {
  let props;
  beforeEach(() => {
    props = {
      programme: {},
      fetching: false,
      getProgramme: jest.fn(),
      createProgramme: jest.fn(),
      updateProgramme: jest.fn()
    };
  });

  it('should render without crashing', () => {
    const programme = {
      name: 'D-Guild',
      code: 'D'
    };
    shallow(<Programme id="1" {...props} programme={programme} />);
  });

  it('should render loading while fetching ', () => {
    const wrapper = shallow(<Programme id="1" {...props} fetching />);

    expect(wrapper.find(LoadingSpinner)).toHaveLength(1);
  });

  it('should render NotFound if there is no programme and not fetching', () => {
    const wrapper = shallow(<Programme id="1" {...props} />);

    expect(wrapper.find(NotFound)).toHaveLength(1);
  });

  it('should render programme form', () => {
    const programme = {
      name: 'D-Guild',
      code: 'D'
    };
    const wrapper = shallow(
      <Programme id="1" {...props} programme={programme} />
    );

    expect(wrapper.find(ProgrammeForm)).toBeTruthy();
  });

  // If there is not a programme in props we want to create a new one
  it('updateProgramme functions correctly', () => {
    const wrapper = shallow(<Programme id="1" {...props} />);
    const newCode = 'D';
    wrapper.instance().updateProgramme({ code: newCode });
    expect(props.createProgramme).toHaveBeenCalledWith({
      programme: { code: newCode }
    });
  });

  // If there is a programme in props we want to update it
  it('updateProgramme functions correctly', () => {
    const programme = {
      name: 'D-Guild',
      code: 'F'
    };

    const id = '1';
    const wrapper = shallow(
      <Programme id={id} {...props} programme={programme} />
    );
    const newName = 'F-Guild';
    wrapper.instance().updateProgramme({ name: newName });
    expect(props.updateProgramme).toHaveBeenCalledWith(id, {
      programme: { name: newName }
    });
  });
});
