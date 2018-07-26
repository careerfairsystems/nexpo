import React from 'react';
import { shallow } from 'enzyme';
import { Helmet } from 'react-helmet';
import HtmlTitle from './HtmlTitle';

const appName = 'Nexpo';

it('should render without crashing', () => {
  shallow(<HtmlTitle />);
});

it('appends the given string to the title', () => {
  const title = 'test-title';
  const wrapper = shallow(<HtmlTitle title={title} />);

  const expectedTitle = `${appName} | ${title}`;
  const expected = (
    <Helmet>
      <title>{expectedTitle}</title>
    </Helmet>
  );
  expect(wrapper.contains(expected)).toBeTruthy();
});

it('default to the application name', () => {
  const wrapper = shallow(<HtmlTitle />);

  const expected = (
    <Helmet>
      <title>{appName}</title>
    </Helmet>
  );
  expect(wrapper.contains(expected)).toBeTruthy();
});
