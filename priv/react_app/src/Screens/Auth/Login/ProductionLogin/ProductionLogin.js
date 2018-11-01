import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import type { Location } from 'react-router-dom';

import HtmlTitle from '../../../../Components/HtmlTitle';
import ProductionLoginForm from '../../../../Forms/ProductionLoginForm';
/**
 * Handles login in production. Supports redirecting back to the route that redirected here
 *
 * This is not integrated with rest of application as there are another pull request touching state
 * - It can authenticate a user, it simply needs to be integrated into global state
 * - By passing isAuthenticated prop, this component will redirect back to where user came from
 */
type Props = {
  location: Location,
  isLoggedIn: boolean,
  login: ({ email: string, password: string }) => Promise<void>
};
class ProductionLogin extends Component<Props> {
  login = (values: { email: string, password: string }) => {
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
      <div className="production-login">
        <HtmlTitle title="Login" />

        <h1>Login</h1>
        <ProductionLoginForm onSubmit={this.login} />

        <br />
        <br />

        <div className="existing-account">
          <div>Hard time logging in?</div>

          <Link to="/signup">Sign up</Link>
          <br />
          <Link to="/forgot-password">Forgot password</Link>
        </div>
      </div>
    );
  }
}

export default ProductionLogin;
