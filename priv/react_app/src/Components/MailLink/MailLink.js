import React from 'react';
import PropTypes from 'prop-types';

/**
 * A Component that renders a link which composes a new mail on click
 */
function MailLink({ to, children }) {
  return <a href={`mailto:${to}`}>{children}</a>;
}

MailLink.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired
};

export default MailLink;
