import React from 'react';
import { shallow } from 'enzyme';
import { capitalize } from 'lodash/fp';
import RoleEdit from './RoleEdit';
import NotFound from '../../../NotFound';
import HtmlTitle from '../../../../Components/HtmlTitle';

describe('RoleEdit', () => {
  let props;
  beforeEach(() => {
    props = {
      role: { type: 'admin', permissions: ['read_all', 'write_all'] },
      getRole: jest.fn(),
      fetching: false,
      updateRole: jest.fn(),
      history: { push: jest.fn() }
    };
  });

  it('should render without crashing', () => {
    shallow(<RoleEdit id="1" {...props} />);
  });

  it('should render NotFound if there is no role', () => {
    const role = {};
    const wrapper = shallow(<RoleEdit id="1" {...props} role={role} />);

    expect(wrapper.find(NotFound)).toHaveLength(1);
  });

  it('should set html title', () => {
    const wrapper = shallow(<RoleEdit id="1" {...props} />);

    expect(
      wrapper.contains(<HtmlTitle title={capitalize(props.role.type)} />)
    ).toBeTruthy();
  });

  it('should render role information', () => {
    const wrapper = shallow(<RoleEdit id="1" {...props} />);

    expect(
      wrapper.contains(<h1>Role: {capitalize(props.role.type)}</h1>)
    ).toBeTruthy();
  });

  it('updateValues should call updateRole with correct values', () => {
    const id = '1';
    const values = { type: 'admin', permissions: ['read_all'] };
    const wrapper = shallow(<RoleEdit id={id} {...props} />);
    wrapper.instance().updateRole(values);
    expect(props.updateRole).toHaveBeenCalledWith(id, { role: values });
    expect(props.history.push).toHaveBeenCalledWith(`/admin/roles/${id}`);
  });
});
