import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

class Logout extends Component {
  componentWillMount() {
    const { logout } = this.props;
    logout();
  }

  render() {
    return <Redirect to="/" />;
  }
}

Logout.propTypes = {
  logout: PropTypes.func.isRequired
};

export default Logout;
