import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './ProductionLogin.css';
import { Redirect, Link } from 'react-router-dom';
import HtmlTitle from '../../../Components/HtmlTitle';
import LoginForm from '../../../Components/Forms/LoginForm';
/**
 * Handles login in production. Supports redirecting back to the route that redirected here
 *
 * This is not integrated with rest of application as there are another pull request touching state
 * - It can authenticate a user, it simply needs to be integrated into global state
 * - By passing isAuthenticated prop, this component will redirect back to where user came from
 */
class ProductionLogin extends Component {
  login = values => {
    const { email, password } = values;
    const { login } = this.props;
    return login({ email, password });
  };

  render() {
    const { isLoggedIn, location } = this.props;

    // Url that redirected here
    const { from } = location.state || { from: { pathname: '/' } };

    if (isLoggedIn) {
      return <Redirect to={from} />;
    }

    return (
      <div className="ProductionLogin_Component">
        <HtmlTitle title="Login" />

        <h1>Login</h1>
        <LoginForm onSubmit={this.login} />

        <br />
        <br />

        <div>Hard time logging in?</div>
        <br />

        <div className="links">
          <Link to="/signup">Sign up</Link>
          <Link to="/forgot-password">Forgot password</Link>
        </div>
      </div>
    );
  }
}

ProductionLogin.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  login: PropTypes.func.isRequired
};
export default ProductionLogin;
