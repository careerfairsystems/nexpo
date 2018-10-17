import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

/**
 * A link component that aims to be more subtle than a regular link
 * Depends on React router
 */

function InvisibleLink({ to, children }) {
  const style = {
    textDecoration: 'none'
  };
  return (
    <Link style={style} to={to}>
      {children}
    </Link>
  );
}

InvisibleLink.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

InvisibleLink.defaultProps = {
  children: undefined
};

export default InvisibleLink;
