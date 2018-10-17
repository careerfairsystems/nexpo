import React from 'react';
import { shallow } from 'enzyme';
import Programme from './Programme';
import NotFound from '../../NotFound';
// import HtmlTitle from '../../../Components/HtmlTitle';

it('should render without crashing', () => {
  const programme = {};
  const func = jest.fn();
  shallow(<Programme id="1" programme={programme} getProgramme={func} updateProgramme={func} />);
});

it('should render NotFound if there is no programme', () => {
  const programme = {};
  const func = jest.fn();
  const wrapper = shallow(
    <Programme id="1" programme={programme} getProgramme={func} updateProgramme={func} />
  );

  expect(wrapper.find(NotFound)).toHaveLength(1);
});

// it('should set html title', () => {
//   const programme = {
//     name: 'Dev'
//   };
//   const func = jest.fn();
//   const wrapper = shallow(<Programme id="1" programme={programme} getProgramme={func} updateProgramme={func} />);
//
//   expect(
//     wrapper.contains(<HtmlTitle title={capitalize(programme.name)} />)
//   ).toBeTruthy();
// });

it('should render programme information', () => {
  const programme = {
    email: 'dev@it',
    firstName: 'Dev',
    lastName: 'X'
  };
  const func = jest.fn();
  const wrapper = shallow(
    <Programme id="1" programme={programme} getProgramme={func} updateProgramme={func} />
  );

  expect(wrapper.contains(<h1>Dev X</h1>)).toBeTruthy();
});
