import React from 'react';
import ErrorMessage from '../../Components/ErrorMessage';
import HtmlTitle from '../../Components/HtmlTitle';

/**
 * A Component that defines the 404 view
 */
export const NotFound = () => (
  <div>
    <HtmlTitle title="404" />
    <ErrorMessage
      message="HTTP 404 | This link does not exist"
      linkUrl="/"
      linkText="Click here to go home"
    />
  </div>
);
