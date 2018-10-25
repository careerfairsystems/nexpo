import React from 'react';
import { Helmet } from 'react-helmet';

/**
 * A component which sets the html title of the page
 */

type Props = {
  title?: ?string
};
const HtmlTitle = ({ title }: Props) => {
  const text = title ? `Nexpo | ${title}` : 'Nexpo';
  return (
    <Helmet>
      <title>{text}</title>
    </Helmet>
  );
};

HtmlTitle.defaultProps = {
  title: null
};

export default HtmlTitle;
