import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd';
import { Redirect } from 'react-router-dom';
import './DevelopmentLogin.css';
import HtmlTitle from '../../../Components/HtmlTitle';
import DevelopmentLoginForm from '../../../Components/Forms/DevelopmentLoginForm';

/**
 * Handles authorization in development
 * - Allows login by only specifying email
 */
const styles = {
  icon: {
    width: 'auto',
    fontSize: 200,
    color: '#ffeb3b'
  }
};
class DevelopmentLogin extends Component {
  login = values => {
    const { email } = values;
    const { login } = this.props;
    login(email);
  };

  render() {
    const { isLoggedIn, location } = this.props;

    // Url that redirected here
    const { from } = location.state || { from: { pathname: '/' } };

    if (isLoggedIn) {
      return <Redirect to={from} />;
    }

    return (
      <div className="development-login">
        <HtmlTitle title="Dev Login" />
        <Icon type="warning" theme="filled" style={styles.icon} />
        <h1>Development Login</h1>
        <DevelopmentLoginForm onSubmit={this.login} />
      </div>
    );
  }
}

DevelopmentLogin.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  login: PropTypes.func.isRequired
};
export default DevelopmentLogin;
